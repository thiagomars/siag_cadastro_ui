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

import { deleteAtividade, getListAtividade } from "../../services/atividade.ts";
import { atividadeFiltrosListagem, atividadeListagem } from "../../types/atividade.d";
import { useNavigate } from "react-router-dom";

export default function Atividade(): JSX.Element {
    const toast = useToastLoading();
    const navigate = useNavigate();

    const [listaAtividade, setListaAtividade] = useState<Array<atividadeListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [AtividadeSelecionado, setAtividadeSelecionado] = useState<atividadeListagem | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<atividadeFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaAtividade = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: atividadeFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListAtividade(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaAtividade(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaAtividade, 500);

    function handleNovoAtividade(): void {
        setAtividadeSelecionado(null);
        navigate("form")
    }

    function handleEditarAtividade(dados: atividadeListagem): void {
        setAtividadeSelecionado({ ...dados });
        navigate(`form/${dados.atividadeId}`);
    }

    function handleDeleteAtividade(dados: atividadeListagem): void {
        setAtividadeSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteAtividade() {
        if (AtividadeSelecionado == null)
            return;

        toast({ mensagem: "Deletando Atividade" });

        const response = await deleteAtividade(AtividadeSelecionado.atividadeId);

        if (response.sucesso) {
            carregaAtividade(registrosPorPagina, listaAtividade?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setAtividadeSelecionado(null);
            toast({
                mensagem: "Atividade deletada com sucesso.",
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

                {!listaAtividade.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhuma Atividade Cadastrada"
                            botao={true}
                            acao={handleNovoAtividade}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Atividades"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoAtividade}

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
                                    {listaAtividade.map((item: atividadeListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.atividadeId}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.atividadeId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmAtividade}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarAtividade(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteAtividade(item)} />
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
                                    carregaAtividade(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaAtividade(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaAtividade(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${AtividadeSelecionado?.atividadeId}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o Atividade: ${AtividadeSelecionado?.nmAtividade}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteAtividade} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>
        </>
    );
}