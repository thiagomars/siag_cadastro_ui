import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getAgrupadorAtivoById, postAgrupadorAtivos, putAgrupadorAtivo } from "../../services/agrupadorAtivo";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { agrupadorAtivoCadastro, agrupadorAtivoListagem } from "../../types/agrupadorAtivo.d";
import { Fa1, Fa2, Fa3, FaBuffer, FaCube } from "react-icons/fa6";
import SelectAreaArmazenagem from "../../templates/selects/AreaArmazenagemSelect";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    agrupadorAtivoSelecionado: agrupadorAtivoListagem | null;
    setAgrupadorAtivoSelecionado: React.Dispatch<React.SetStateAction<agrupadorAtivoListagem | null>>;
    carregaAgrupadorAtivos: Function;
}

export default function ModalAgrupadorAtivo(props: Props) {
    const { open, setOpen, agrupadorAtivoSelecionado, setAgrupadorAtivoSelecionado, carregaAgrupadorAtivos } = props;

    const [id, setId] = useState(0);
    const [salvandoAgrupadorAtivo, setSalvandoAgrupadorAtivo] = useState<boolean>(false);
    const { handleSubmit: AgrupadorAtivoSubmit, reset: AgrupadorAtivoReset, control: AgrupadorAtivoControl } = useForm<agrupadorAtivoCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (agrupadorAtivoSelecionado != null) {
            carregaAgrupadorAtivosPorId(agrupadorAtivoSelecionado.agrupadorId);
        }
    }, [agrupadorAtivoSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoAgrupadorAtivo(true);
        toast({ mensagem: "Salvando Agrupador Ativo" });

        let dados: agrupadorAtivoCadastro;

        await AgrupadorAtivoSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = id > 0 ? () => putAgrupadorAtivo(dados) : () => postAgrupadorAtivos(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Agrupador Ativo alterado com Sucesso!" : "Agrupador Ativo cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaAgrupadorAtivos();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoAgrupadorAtivo(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setAgrupadorAtivoSelecionado(null);
        setId(0);
        AgrupadorAtivoReset({
            agrupadorId: 0,
            fgStatus: 0,
            areaArmazenagemId: 0,
            cdSequencia: 0,
            codigo1: "",
            codigo2: "",
            codigo3: "",
            tpAgrupamento: 0
        })
    }

    async function carregaAgrupadorAtivosPorId(id: number): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getAgrupadorAtivoById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            AgrupadorAtivoReset({
                ...response.dados,
                areaArmazenagem: {
                    value: response.dados?.areaArmazenagem?.areaArmazenagemId,
                    label: response.dados?.areaArmazenagem?.areaArmazenagemId + " - " + response.dados?.areaArmazenagem?.nmAreaArmazenagem
                },
            });
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo,
                isLoading: false
            });
        }
    }

    function handleCloseModal(): void {
        setOpen(false);
        limparCampos();
    }

    function getSubtitulo(): string {
        return `Preencha os campos abaixo para ${id > 0 ? "editar" : "cadastrar"} um novo Agrupador Ativo `;
    }

    return (
        <ModalLateral
            title={id > 0 ? "Editar Agrupador Ativo" : "Cadastrar Agrupador Ativo"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoAgrupadorAtivo}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="lg:grid-cols-2">
                <Formulario.InputNumber
                    name="tpAgrupamento"
                    label="Agrupamento"
                    disabled={salvandoAgrupadorAtivo}
                    opcional={false}
                    control={AgrupadorAtivoControl}
                    decimalPlaces={0}
                    align="text-left"
                    className="lg:col-span-1"
                    icone={<FaBuffer className="fill-gray-600" />}
                />

                <Formulario.InputNumber
                    name="codigo1"
                    label="Código 01"
                    disabled={salvandoAgrupadorAtivo}
                    opcional={false}
                    control={AgrupadorAtivoControl}
                    decimalPlaces={0}
                    align="text-left"
                    icone={<Fa1 className="fill-gray-600" />}
                />

                <Formulario.InputNumber
                    name="codigo2"
                    label="Código 02"
                    disabled={salvandoAgrupadorAtivo}
                    opcional={false}
                    control={AgrupadorAtivoControl}
                    decimalPlaces={0}
                    align="text-left"
                    icone={<Fa2 className="fill-gray-600" />}
                />

                <Formulario.InputNumber
                    name="codigo3"
                    label="Código 03"
                    disabled={salvandoAgrupadorAtivo}
                    opcional={false}
                    control={AgrupadorAtivoControl}
                    decimalPlaces={0}
                    align="text-left"
                    icone={<Fa3 className="fill-gray-600" />}
                />

                <Formulario.InputNumber
                    name="cdSequencia"
                    label="Sequência"
                    disabled={salvandoAgrupadorAtivo}
                    opcional={false}
                    control={AgrupadorAtivoControl}
                    decimalPlaces={0}
                    align="text-left"
                    icone={<FaCube className="fill-gray-600" />}
                />

                <Formulario.InputData
                    name="dtAgrupador"
                    label="Data Agrupador"
                    disabled={salvandoAgrupadorAtivo}
                    control={AgrupadorAtivoControl}
                />

                <SelectAreaArmazenagem>
                    <SelectAreaArmazenagem.Single
                        control={AgrupadorAtivoControl}
                        disabled={salvandoAgrupadorAtivo}
                        opcional={false}
                        className="lg:col-span-2"
                    />
                </SelectAreaArmazenagem>

                <Formulario.InputNumber
                    name="fgStatus"
                    label="Status"
                    disabled={salvandoAgrupadorAtivo}
                    opcional={false}
                    control={AgrupadorAtivoControl}
                    decimalPlaces={0}
                    className="lg:col-span-2"
                />
            </Formulario>
        </ModalLateral>
    );
}