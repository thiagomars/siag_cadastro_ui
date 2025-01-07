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

import { deleteTransportadora, getListTransportadora } from "../../services/transportadora";
import { transportadoraFiltrosListagem, transportadoraListagem } from "../../types/transportadora.d";
import { useNavigate } from "react-router-dom";

export default function transportadora(): JSX.Element {
    const toast = useToastLoading();
    const navigate = useNavigate();

    const [listatransportadora, setListatransportadora] = useState<Array<transportadoraListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [transportadoraSelecionado, settransportadoraSelecionado] = useState<transportadoraListagem | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<transportadoraFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregatransportadora = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: transportadoraFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListTransportadora(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListatransportadora(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregatransportadora, 500);

    function handleNovotransportadora(): void {
        settransportadoraSelecionado(null);
        navigate("form")
    }

    function handleEditartransportadora(dados: transportadoraListagem): void {
        settransportadoraSelecionado({ ...dados });
        navigate(`form/${dados.transportadoraId}`);
    }

    function handledeleteTransportadora(dados: transportadoraListagem): void {
        settransportadoraSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmdeleteTransportadora() {
        if (transportadoraSelecionado == null)
            return;

        toast({ mensagem: "Deletando transportadora" });

        const response = await deleteTransportadora(transportadoraSelecionado.transportadoraId);

        if (response.sucesso) {
            carregatransportadora(registrosPorPagina, listatransportadora?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            settransportadoraSelecionado(null);
            toast({
                mensagem: "transportadora deletada com sucesso.",
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

                {!listatransportadora.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhuma transportadora cadastrada"
                            botao={true}
                            acao={handleNovotransportadora}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Transportadoras"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovotransportadora}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Empresa</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Nome reduzido</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Logradouro</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Bairro</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>CEP</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>UF</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listatransportadora.map((item: transportadoraListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.id}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.transportadoraId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmNomeEmpresa}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmNomeReduzido}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmLogradouro}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmBairro}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmCep}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmUf}
                                                </Tabela.Body.Linha.Coluna>
                                                
                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditartransportadora(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handledeleteTransportadora(item)} />
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
                                    carregatransportadora(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregatransportadora(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregatransportadora(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${transportadoraSelecionado?.nmNomeEmpresa}`} />
                <Modal.Descricao texto={`Deseja realmente deletar a transportadora: ${transportadoraSelecionado?.nmNomeEmpresa}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmdeleteTransportadora} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>
        </>
    );
}