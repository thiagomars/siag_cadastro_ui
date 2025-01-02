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

import Modalparametro from "./modal";

import { deleteParametro, getListParametro } from "../../services/parametro";
import { parametroFiltrosListagem, parametroListagem } from "../../types/parametro.d";

export default function parametro(): JSX.Element {
    const toast = useToastLoading();

    const [listaparametro, setListaparametro] = useState<Array<parametroListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [parametroSelecionado, setparametroSelecionado] = useState<parametroListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<parametroFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaparametro = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: parametroFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListParametro(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaparametro(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaparametro, 500);

    function handleNovoparametro(): void {
        setparametroSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarparametro(dados: parametroListagem): void {
        setparametroSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handledeleteParametro(dados: parametroListagem): void {
        setparametroSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmdeleteParametro() {
        if (parametroSelecionado == null)
            return;

        toast({ mensagem: "Deletando parametro" });

        const response = await deleteParametro(parametroSelecionado.id_parametro.toString());

        if (response.sucesso) {
            carregaparametro(registrosPorPagina, listaparametro?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setparametroSelecionado(null);
            toast({
                mensagem: "Parametro deletado com sucesso.",
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

                {!listaparametro.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhum parametro cadastrado"
                            botao={true}
                            acao={handleNovoparametro}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="parametros - parametro"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoparametro}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Descrição</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listaparametro.map((item: parametroListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.id}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.id_parametro}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nm_parametro}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nm_valor}
                                                </Tabela.Body.Linha.Coluna>
                                                
                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarparametro(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handledeleteParametro(item)} />
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
                                    carregaparametro(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaparametro(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaparametro(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${parametroSelecionado?.nm_parametro}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o parametro: ${parametroSelecionado?.nm_parametro}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmdeleteParametro} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <Modalparametro
                open={openModal}
                setOpen={setOpenModal}
                ParametroSelecionado={parametroSelecionado}
                setParametroSelecionado={setparametroSelecionado}
                carregaParametros={carregaparametro}
            />
        </>
    );
}