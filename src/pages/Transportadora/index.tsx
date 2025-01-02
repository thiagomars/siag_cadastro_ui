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

import Modaltransportadora from "./modal";

import { deleteTransportadora, getListTransportadora } from "../../services/transportadora";
import { TransportadoraFiltrosListagem, TransportadoraListagem } from "../../types/transportadora.d";

export default function transportadora(): JSX.Element {
    const toast = useToastLoading();

    const [listatransportadora, setListatransportadora] = useState<Array<TransportadoraListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [transportadoraSelecionado, settransportadoraSelecionado] = useState<TransportadoraListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<TransportadoraFiltrosListagem>();
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
        let filtros: TransportadoraFiltrosListagem = {
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

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregatransportadora, 500);

    function handleNovotransportadora(): void {
        settransportadoraSelecionado(null);
        setOpenModal(true);
    }

    function handleEditartransportadora(dados: TransportadoraListagem): void {
        settransportadoraSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handledeleteTransportadora(dados: TransportadoraListagem): void {
        settransportadoraSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmdeleteTransportadora() {
        if (transportadoraSelecionado == null)
            return;

        toast({ mensagem: "Deletando transportadora" });

        const response = await deleteTransportadora(transportadoraSelecionado.id_transportadora.toString());

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
                                titulo="transportadoras - transportadora"
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
                                    <Tabela.Header.Coluna>Descrição</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listatransportadora.map((item: TransportadoraListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.id}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.id_transportadora}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nm_nomeempresa}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nm_nomereduzido}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nm_logradouro}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nm_bairro}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nm_cep}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nm_uf}
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
                <Modal.Titulo texto={`Deletar ${transportadoraSelecionado?.id_transportadora}`} />
                <Modal.Descricao texto={`Deseja realmente deletar a transportadora: ${transportadoraSelecionado?.id_transportadora}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmdeleteTransportadora} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <Modaltransportadora
                open={openModal}
                setOpen={setOpenModal}
                TransportadoraSelecionado={transportadoraSelecionado}
                setTransportadoraSelecionado={settransportadoraSelecionado}
                carregaTransportadoras={carregatransportadora}
            />
        </>
    );
}