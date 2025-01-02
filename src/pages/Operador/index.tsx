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

import Modaloperador from "./modal";

import { deleteOperador, getListOperador } from "../../services/operador";
import { operadorFiltrosListagem, operadorListagem } from "../../types/operador.d";

export default function operador(): JSX.Element {
    const toast = useToastLoading();

    const [listaoperador, setListaoperador] = useState<Array<operadorListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [operadorSelecionado, setoperadorSelecionado] = useState<operadorListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<operadorFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaoperador = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: operadorFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListOperador(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaoperador(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaoperador, 500);

    function handleNovooperador(): void {
        setoperadorSelecionado(null);
        setOpenModal(true);
    }

    function handleEditaroperador(dados: operadorListagem): void {
        setoperadorSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handleDeleteoperador(dados: operadorListagem): void {
        setoperadorSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteoperador() {
        if (operadorSelecionado == null)
            return;

        toast({ mensagem: "Deletando operador" });

        const response = await deleteOperador(operadorSelecionado.operadorId.toString());

        if (response.sucesso) {
            carregaoperador(registrosPorPagina, listaoperador?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setoperadorSelecionado(null);
            toast({
                mensagem: "operador deletado com sucesso.",
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

                {!listaoperador.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhum operador cadastrado"
                            botao={true}
                            acao={handleNovooperador}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Operadores"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovooperador}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Nome operador</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Login</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listaoperador.map((item: operadorListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.id}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.operadorId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmOperador}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmLogin}
                                                </Tabela.Body.Linha.Coluna>

                                                {/* <Tabela.Body.Linha.Coluna>
                                                    {item.dt_login.toString()}
                                                </Tabela.Body.Linha.Coluna> */}
                                                
                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditaroperador(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteoperador(item)} />
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
                                    carregaoperador(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaoperador(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaoperador(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${operadorSelecionado?.nmOperador}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o operador: ${operadorSelecionado?.nmOperador}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteoperador} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <Modaloperador
                open={openModal}
                setOpen={setOpenModal}
                operadorSelecionado={operadorSelecionado}
                setoperadorSelecionado={setoperadorSelecionado}
                carregaoperadors={carregaoperador}
            />
        </>
    );
}