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

import ModalAgrupadorAtivo from "./modal";

import { deleteAgrupadorAtivo, getListAgrupadorAtivo } from "../../services/agrupadorAtivo";
import { agrupadorAtivoFiltrosListagem, agrupadorAtivoListagem } from "../../types/agrupadorAtivo.d";
import { formatarData } from "../../utils/data";

export default function AgrupadorAtivo(): JSX.Element {
    const toast = useToastLoading();

    const [listaAgrupadorAtivo, setListaAgrupadorAtivo] = useState<Array<agrupadorAtivoListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [AgrupadorAtivoSelecionado, setAgrupadorAtivoSelecionado] = useState<agrupadorAtivoListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<agrupadorAtivoFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaAgrupadorAtivo = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: agrupadorAtivoFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListAgrupadorAtivo(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaAgrupadorAtivo(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaAgrupadorAtivo, 500);

    function handleNovoAgrupadorAtivo(): void {
        setAgrupadorAtivoSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarAgrupadorAtivo(dados: agrupadorAtivoListagem): void {
        setAgrupadorAtivoSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handleDeleteAgrupadorAtivo(dados: agrupadorAtivoListagem): void {
        setAgrupadorAtivoSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteAgrupadorAtivo() {
        if (AgrupadorAtivoSelecionado == null)
            return;

        toast({ mensagem: "Deletando Agrupador Ativo" });

        const response = await deleteAgrupadorAtivo(AgrupadorAtivoSelecionado.agrupadorId);

        if (response.sucesso) {
            carregaAgrupadorAtivo(registrosPorPagina, listaAgrupadorAtivo?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setAgrupadorAtivoSelecionado(null);
            toast({
                mensagem: "Agrupador Ativo deletado com sucesso.",
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

                {!listaAgrupadorAtivo.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhum Agrupador Ativo Cadastrado"
                            botao={true}
                            acao={handleNovoAgrupadorAtivo}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Agrupador Ativo"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoAgrupadorAtivo}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Agrupador</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Código</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Sequência</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Data Agrupador</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Armazenagem</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Status</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listaAgrupadorAtivo.map((item: agrupadorAtivoListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.agrupadorId}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.agrupadorId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.tpAgrupamento}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    <div>
                                                        <p>Setor: {item?.codigo1}</p>
                                                        <p>Setor: {item?.codigo2}</p>
                                                        <p>Setor: {item?.codigo3}</p>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item?.cdSequencia}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {formatarData(item.dtAgrupador)}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    {item.areaArmazenagemId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    {item.fgStatus}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarAgrupadorAtivo(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteAgrupadorAtivo(item)} />
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
                                    carregaAgrupadorAtivo(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaAgrupadorAtivo(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaAgrupadorAtivo(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${AgrupadorAtivoSelecionado?.cdSequencia}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o Agrupador Ativo: ${AgrupadorAtivoSelecionado?.cdSequencia}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteAgrupadorAtivo} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <ModalAgrupadorAtivo
                open={openModal}
                setOpen={setOpenModal}
                agrupadorAtivoSelecionado={AgrupadorAtivoSelecionado}
                setAgrupadorAtivoSelecionado={setAgrupadorAtivoSelecionado}
                carregaAgrupadorAtivos={carregaAgrupadorAtivo}
            />
        </>
    );
}