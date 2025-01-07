import { useEffect, useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import { useForm } from "react-hook-form";
import useToastLoading from "../../hooks/useToastLoading";

import Botao from "../../components/Button";
import EmptyPage from "../../components/EmptyPage";
import Formulario from "../../components/Input";
import Loading from "../../components/Loading";
import MenuDropdown from "../../components/MenuDropdown";
import Modal from "../../components/Modal";
import PaginacaoTabela from "../../components/PaginacaoTabela";
import Tabela from "../../components/Tabela";
import Box, { BoxContainer } from "../../components/Box";

import Modalturno from "./modal";

import { deleteTurno, getListTurno } from "../../services/turno";
import { TurnoFiltrosListagem, TurnoListagem } from "../../types/turno.d";
import Tag from "../../components/Tag";
import { formatarData } from "../../utils/data";
import { FaClock } from "react-icons/fa6";

export default function turno(): JSX.Element {
    const toast = useToastLoading();

    const [listaturno, setListaturno] = useState<Array<TurnoListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [turnoSelecionado, setturnoSelecionado] = useState<TurnoListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<TurnoFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaturno = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: TurnoFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListTurno(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaturno(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaturno, 500);

    function handleNovoturno(): void {
        setturnoSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarturno(dados: TurnoListagem): void {
        setturnoSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handledeleteTurno(dados: TurnoListagem): void {
        setturnoSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmdeleteTurno() {
        if (turnoSelecionado == null)
            return;

        toast({ mensagem: "Deletando turno" });

        const response = await deleteTurno(turnoSelecionado.turnoId);

        if (response.sucesso) {
            carregaturno(registrosPorPagina, listaturno?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setturnoSelecionado(null);
            toast({
                mensagem: "turno deletado com sucesso.",
                tipo: response.tipo,
            });
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo,
            });
        }
    }

    if (loading) return <Loading />;

    return (
        <>
            <BoxContainer>
                <Box>
                    <Box.Header>
                        <Box.Header.Content>
                            <Box.Header.Content.Titulo>Filtros</Box.Header.Content.Titulo>
                        </Box.Header.Content>
                    </Box.Header>
                    <Formulario>
                        <Formulario.InputTexto
                            name="pesquisa"
                            opcional={true}
                            label="Pesquisa"
                            placeholder="Pesquisar..."
                            subTitulo="(Id e Descrição)"
                            register={register}
                            isFiltro
                        />
                    </Formulario>

                </Box>

                {!listaturno.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhum turno cadastrado"
                            botao={true}
                            acao={handleNovoturno}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Turnos"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoturno}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Código</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Horário</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Dia Anterior/Sucessor</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listaturno.map((item: TurnoListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.id}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.turnoId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.cdTurno}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <Tag status="success" className="flex flex-row items-center gap-0.5"><FaClock />Início: {formatarData(item.dtInicio, "hora")}</Tag>
                                                        <Tag status="error" className="flex flex-row items-center gap-0.5"><FaClock />Fim: {formatarData(item.dtFim, "hora")}</Tag>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        {!!item.diaAnterior && <Tag status="alert" className="flex flex-row items-center gap-0.5">{"Dia anterior"}</Tag>}
                                                        {!!item.diaSucessor && <Tag status="destaque" className="flex flex-row items-center gap-0.5">{"Dia sucessor"}</Tag>}
                                                        {!item.diaAnterior && !item.diaSucessor && "-"}
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarturno(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handledeleteTurno(item)} />
                                                    </MenuDropdown>
                                                </Tabela.Body.Linha.Coluna>
                                            </Tabela.Body.Linha>
                                        );
                                    })}
                                </Tabela.Body>
                            </Tabela>

                            <PaginacaoTabela
                                carregando={loadingListagem}
                                pagina={paginaAtual}
                                totalRegistros={totalRegistros}
                                registrosPorPagina={registrosPorPagina}
                                totalPaginas={totalPaginas}
                                onClickPaginaAnterior={() => {
                                    setPaginaAtual(paginaAtual - 1);
                                    carregaturno(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaturno(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaturno(registrosPorPagina, pagina);
                                }}
                            />
                        </>
                    </Box>
                )}
            </BoxContainer>

            <Modal
                open={confirmacaoDeletar}
                setOpen={setConfirmacaoDeletar}
            >
                <Modal.Titulo texto={`Deletar ${turnoSelecionado?.cdTurno}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o turno: ${turnoSelecionado?.cdTurno}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmdeleteTurno} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <Modalturno
                open={openModal}
                setOpen={setOpenModal}
                TurnoSelecionado={turnoSelecionado}
                setTurnoSelecionado={setturnoSelecionado}
                carregaTurnos={carregaturno}
            />
        </>
    );
}