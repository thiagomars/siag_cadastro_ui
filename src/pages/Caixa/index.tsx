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

import { deleteCaixa, getListCaixa } from "../../services/caixa";
import { caixaFiltrosListagem, caixaListagem } from "../../types/caixa.d";
import { useNavigate } from "react-router-dom";
import { formatarData } from "../../utils/data";
import Tag from "../../components/Tag";

export default function Caixa(): JSX.Element {
    const toast = useToastLoading();
    const navigate = useNavigate();

    const [listaCaixa, setListaCaixa] = useState<Array<caixaListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [CaixaSelecionado, setCaixaSelecionado] = useState<caixaListagem | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<caixaFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaCaixa = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: caixaFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListCaixa(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaCaixa(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaCaixa, 500);

    function handleNovoCaixa(): void {
        setCaixaSelecionado(null);        
        navigate("form")
    }

    function handleEditarCaixa(dados: caixaListagem): void {
        setCaixaSelecionado({ ...dados });
        navigate(`form/${dados.caixaId}`);
    }

    function handleDeleteCaixa(dados: caixaListagem): void {
        setCaixaSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteCaixa() {
        if (CaixaSelecionado == null)
            return;

        toast({ mensagem: "Deletando Caixa" });

        const response = await deleteCaixa(CaixaSelecionado.caixaId);

        if (response.sucesso) {
            carregaCaixa(registrosPorPagina, listaCaixa?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setCaixaSelecionado(null);
            toast({
                mensagem: "Caixa deletado com sucesso.",
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

                {!listaCaixa.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhuma Caixa Cadastrada"
                            botao={true}
                            acao={handleNovoCaixa}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Caixa"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoCaixa}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Código</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Local</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Data</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Status</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listaCaixa.map((item: caixaListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.caixaId}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.caixaId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    <div>
                                                        <p>{item.nrCaixa}</p>
                                                        <p>Produto: {item.cdProduto}</p>
                                                        <p>Cor: {item.cdCor}</p>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    <div>
                                                        <p>Agrupador: {item.agrupador?.cdSequencia}</p>
                                                        <p>Identificação: {item.pallet.cd_identificacao}</p>
                                                        <p>Programa: {item.programa.cdPrograma}</p>
                                                        <p>Pedido: {item.pedidoId}</p>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    <div>
                                                        <p>Embalagem: {formatarData(item.dtEmbalagem, "data")}</p>
                                                        <p>Sorter: {formatarData(item.dtSorter, "data")}</p>
                                                        <p>Estufamento: {formatarData(item.dtEstufamento, "data")}</p>
                                                        <p>Expedição: {formatarData(item.dtExpedicao, "data")}</p>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <div>
                                                        <p>Status: {item.fgStatus}</p>
                                                        <Tag status={item.fgRfid ? "modifed" : "alert"}>{item.fgRfid ? "FRID" : "Não FRID"}</Tag>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarCaixa(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteCaixa(item)} />
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
                                    carregaCaixa(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaCaixa(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaCaixa(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${CaixaSelecionado?.nrCaixa}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o Caixa: ${CaixaSelecionado?.nrCaixa}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteCaixa} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>
        </>
    );
}