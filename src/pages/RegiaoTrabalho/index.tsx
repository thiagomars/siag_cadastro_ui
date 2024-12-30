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

import ModalRegiaoTrabalho from "./modal";

import { deleteRegiaoTrabalho, getListRegiaoTrabalho } from "../../services/regiaoTrabalho";
import { regiaoTrabalhoFiltrosListagem, regiaoTrabalhoListagem } from "../../types/regiaoTrabalho.d";

export default function RegiaoTrabalho(): JSX.Element {
    const toast = useToastLoading();

    const [listaRegiaoTrabalho, setListaRegiaoTrabalho] = useState<Array<regiaoTrabalhoListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [RegiaoTrabalhoSelecionado, setRegiaoTrabalhoSelecionado] = useState<regiaoTrabalhoListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<regiaoTrabalhoFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaRegiaoTrabalho = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: regiaoTrabalhoFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListRegiaoTrabalho(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaRegiaoTrabalho(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaRegiaoTrabalho, 500);

    function handleNovoRegiaoTrabalho(): void {
        setRegiaoTrabalhoSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarRegiaoTrabalho(dados: regiaoTrabalhoListagem): void {
        setRegiaoTrabalhoSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handleDeleteRegiaoTrabalho(dados: regiaoTrabalhoListagem): void {
        setRegiaoTrabalhoSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteRegiaoTrabalho() {
        if (RegiaoTrabalhoSelecionado == null)
            return;

        toast({ mensagem: "Deletando Região de Trabalho" });

        const response = await deleteRegiaoTrabalho(RegiaoTrabalhoSelecionado.regiaoTrabalhoId);

        if (response.sucesso) {
            carregaRegiaoTrabalho(registrosPorPagina, listaRegiaoTrabalho?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setRegiaoTrabalhoSelecionado(null);
            toast({
                mensagem: "Região de Trabalho deletado com sucesso.",
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

                {!listaRegiaoTrabalho.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhum Região de Trabalho Cadastrado"
                            botao={true}
                            acao={handleNovoRegiaoTrabalho}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Região de Trabalho"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoRegiaoTrabalho}

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
                                    {listaRegiaoTrabalho.map((item: regiaoTrabalhoListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.regiaoTrabalhoId}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.regiaoTrabalhoId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmRegiaoTrabalho}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.deposito?.nmDeposito}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarRegiaoTrabalho(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteRegiaoTrabalho(item)} />
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
                                    carregaRegiaoTrabalho(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaRegiaoTrabalho(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaRegiaoTrabalho(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${RegiaoTrabalhoSelecionado?.nmRegiaoTrabalho}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o Região de Trabalho: ${RegiaoTrabalhoSelecionado?.nmRegiaoTrabalho}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteRegiaoTrabalho} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <ModalRegiaoTrabalho
                open={openModal}
                setOpen={setOpenModal}
                regiaoTrabalhoSelecionado={RegiaoTrabalhoSelecionado}
                setRegiaoTrabalhoSelecionado={setRegiaoTrabalhoSelecionado}
                carregaRegiaoTrabalhos={carregaRegiaoTrabalho}
            />
        </>
    );
}