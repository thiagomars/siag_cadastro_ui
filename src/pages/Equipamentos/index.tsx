import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';

import ModalAgrupador from "./modal";
import Loading from "../../components/Loading";
import Box, { BoxContainer } from "../../components/Box";
import Formulario from "../../components/Input";
import SelectSetor from "../../templates/selects/SetorSelect";
import StatusAgrupador from "../../components/StatusAgrupador";
import { SetorSelect } from "../../types/setorTrabalho.d";
import { corStatusAreaArmazenagem, statusLuz } from "../../types/areaArmazenagem.d";
import { getStatusGaiolas, getTiposStatusAreaArmazenagem } from "../../services/areaArmazenagem";
import useToastLoading from "../../hooks/useToastLoading";
import EmptyPage from "../../components/EmptyPage";
import Botao from "../../components/Button";
import { desligarLuzesVerdes, desligarLuzesVermelhas, ligarLuzesVermelhas } from "../../services/luzes";

export default function Equipamentos() {
    const toast = useToastLoading();

    const [loading, setLoading] = useState(true);
    const [loadingListagem, setLoadingListagem] = useState(true);
    const [modal, setModal] = useState(false);
    const [agrupador, setAgrupador] = useState<corStatusAreaArmazenagem | null>(null);
    const [tiposStatus, setTiposStatus] = useState<Array<corStatusAreaArmazenagem>>([]);
    const [gaiolas, setGaiolas] = useState<Array<Array<Array<corStatusAreaArmazenagem>>>>([]);
    const { control, watch } = useForm<SetorSelect>();

    const selectedSetor = watch('setorId')

    useEffect(() => {
        carregarStatus();
    }, [])

    useEffect(() => {
        if (selectedSetor) {
            carregarStatusGaiolas();
        }
    }, [selectedSetor])

    async function carregarStatus(): Promise<void> {
        const request = () => getTiposStatusAreaArmazenagem();

        const response = await request();
        if (response.sucesso) {
            setTiposStatus(response.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setLoading(false)
    }

    async function carregarStatusGaiolas(): Promise<void> {
        // setGaiolas(dados);
        const request = () => getStatusGaiolas(selectedSetor);

        setLoadingListagem(true);
        const response = await request();
        if (response.sucesso) {
            setGaiolas(response.dados);
            console.log(response.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setLoadingListagem(false);
    }

    async function handleLigarLuzesVermelhas(): Promise<void> {
        const request = () => ligarLuzesVermelhas();
        const response = await request();

        if (response.sucesso) {
            await carregarStatusGaiolas()
            toast({ tipo: response.tipo, mensagem: "Sucesso" });
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }
    }

    async function handleDesligarLuzesVermelhas(): Promise<void> {
        const request = () => desligarLuzesVermelhas();
        const response = await request();

        if (response.sucesso) {
            await carregarStatusGaiolas()
            toast({ tipo: response.tipo, mensagem: "Sucesso" });
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }
    }

    async function handleDesligarLuzesVerdes(): Promise<void> {
        const request = () => desligarLuzesVerdes();
        const response = await request();

        if (response.sucesso) {
            await carregarStatusGaiolas()
            toast({ tipo: response.tipo, mensagem: "Sucesso" });
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }
    }

    function handleOpenModal(agrupador: corStatusAreaArmazenagem): void {
        setModal(true);
        setAgrupador(agrupador);
    }

    const listaTiposStatus = tiposStatus.map(status => (
        <StatusAgrupador key={status.tipo} tipo={status.tipo} crossed={status.semPallet} color={status.cor} />
    ));

    if (loading) return <Loading />;

    return (
        <BoxContainer className="h-full">
            <Box>
                <Box.Header>
                    <Box.Header.Content>
                        <Box.Header.Content.Titulo>
                            Filtros
                        </Box.Header.Content.Titulo>
                    </Box.Header.Content>
                </Box.Header>
                <Formulario className="md:grid-cols-4">
                    <SelectSetor
                        control={control}
                        opcional={true}
                        className="col-span-1"
                        label="Setor de Trabalho"
                    />
                    {selectedSetor &&
                        <div className="col-span-3 flex gap-3">
                            <Botao texto="Ligar Luzes Vermelhas" tipo="salvar" onClick={handleLigarLuzesVermelhas} />
                            <Botao texto="Desligar Luzes Vermelhas" tipo="erro" onClick={handleDesligarLuzesVermelhas} />
                            <Botao texto="Desligar Luzes Verdes" tipo="erro" onClick={handleDesligarLuzesVerdes} />
                        </div>
                    }
                </Formulario>
                <div className={"grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 place-items-center gap-2 mt-8 mb-4"}>
                    <StatusAgrupador crossed />
                    {listaTiposStatus}
                </div>
            </Box>
            {selectedSetor && (
                <Box className="flex justify-center">
                    {
                        !loadingListagem ? <Loading /> : (
                            <>
                                {!gaiolas.length ? (
                                    <EmptyPage
                                        texto="Nenhuma equipamento cadastrado"
                                        acao={() => { }}
                                    />) : gaiolas.map((listaAvenida, index) =>
                                    (
                                        <Box key={index} className="flex flex-col justify-center items-center gap-4">
                                            {
                                                listaAvenida.map(listaGaiolas =>
                                                (<>
                                                    <Box className="grid grid-cols-4 lg:grid-cols-12 place-items-center gap-4 w-full">
                                                        <Box.Header>
                                                            <h1 className="font-semibold text-primary-900 text-xl">Caracol: {(index + 1) * 100 + listaGaiolas[0].caracol}</h1>
                                                        </Box.Header>
                                                        {
                                                            listaGaiolas.map(gaiola => (
                                                                <StatusAgrupador
                                                                    key={`${gaiola.caracol}-${gaiola.gaiola}`}
                                                                    color={gaiola.cor}
                                                                    crossed={gaiola.semPallet}
                                                                    gaiola={gaiola.gaiola}
                                                                    caracol={(index + 1) * 100 + gaiola.gaiola}
                                                                    handleOnClick={() => handleOpenModal(gaiola)}
                                                                    isCard
                                                                    className="h-48 cursor-pointer" />
                                                            ))
                                                        }
                                                    </Box></>
                                                ))
                                            }
                                        </Box>
                                    )
                                    )
                                }
                            </>
                        )
                    }
                    <StatusAgrupador
                        key={`${10}-${2}`}
                        gaiola={1}
                        caracol={(0 + 1) * 100 + 1}
                        handleOnClick={() => { }}
                        status={statusLuz.Desligado}
                        isCard
                        className="h-48 cursor-pointer" />
                </Box>
            )}
            <ModalAgrupador open={modal} setOpen={setModal} agrupadorSelecionado={agrupador} />
        </BoxContainer>
    );
}
