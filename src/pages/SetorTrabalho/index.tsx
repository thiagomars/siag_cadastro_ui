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

import ModalSetorTrabalho from "./modal";

import { deleteSetorTrabalho, getListSetorTrabalho } from "../../services/setorTrabalho";
import { setorTrabalhoFiltrosListagem, setorTrabalhoListagem } from "../../types/setorTrabalho.d";

export default function SetorTrabalho(): JSX.Element {
    const toast = useToastLoading();

    const [listaSetorTrabalho, setListaSetorTrabalho] = useState<Array<setorTrabalhoListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [SetorTrabalhoSelecionado, setSetorTrabalhoSelecionado] = useState<setorTrabalhoListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<setorTrabalhoFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaSetorTrabalho = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: setorTrabalhoFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListSetorTrabalho(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaSetorTrabalho(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaSetorTrabalho, 500);

    function handleNovoSetorTrabalho(): void {
        setSetorTrabalhoSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarSetorTrabalho(dados: setorTrabalhoListagem): void {
        setSetorTrabalhoSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handleDeleteSetorTrabalho(dados: setorTrabalhoListagem): void {
        setSetorTrabalhoSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteSetorTrabalho() {
        if (SetorTrabalhoSelecionado == null)
            return;

        toast({ mensagem: "Deletando Setor de Trabalho" });

        const response = await deleteSetorTrabalho(SetorTrabalhoSelecionado.setorTrabalhoId);

        if (response.sucesso) {
            carregaSetorTrabalho(registrosPorPagina, listaSetorTrabalho?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setSetorTrabalhoSelecionado(null);
            toast({
                mensagem: "Setor de Trabalho deletado com sucesso.",
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

                {!listaSetorTrabalho.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhum Setor de Trabalho Cadastrado"
                            botao={true}
                            acao={handleNovoSetorTrabalho}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Setor de Trabalho"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoSetorTrabalho}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Descrição</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Depósito</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listaSetorTrabalho.map((item: setorTrabalhoListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.setorTrabalhoId}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.setorTrabalhoId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmSetorTrabalho}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.deposito?.nmDeposito}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarSetorTrabalho(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteSetorTrabalho(item)} />
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
                                    carregaSetorTrabalho(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaSetorTrabalho(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaSetorTrabalho(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${SetorTrabalhoSelecionado?.nmSetorTrabalho}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o Setor de Trabalho: ${SetorTrabalhoSelecionado?.nmSetorTrabalho}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteSetorTrabalho} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <ModalSetorTrabalho
                open={openModal}
                setOpen={setOpenModal}
                setorTrabalhoSelecionado={SetorTrabalhoSelecionado}
                setSetorTrabalhoSelecionado={setSetorTrabalhoSelecionado}
                carregaSetorTrabalhos={carregaSetorTrabalho}
            />
        </>
    );
}