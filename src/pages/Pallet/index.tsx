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

// import ModalPallet from "./modal";

import { deletePallet, getListPallet } from "../../services/pallet";
import { palletFiltrosListagem, palletListagem } from "../../types/pallet.d";

export default function Pallet(): JSX.Element {
    const toast = useToastLoading();

    const [listaPallet, setListaPallet] = useState<Array<palletListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [PalletSelecionado, setPalletSelecionado] = useState<palletListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<palletFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaPallet = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: palletFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListPallet(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaPallet(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaPallet, 500);

    function handleNovoPallet(): void {
        setPalletSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarPallet(dados: palletListagem): void {
        setPalletSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handleDeletePallet(dados: palletListagem): void {
        setPalletSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeletePallet() {
        if (PalletSelecionado == null)
            return;

        toast({ mensagem: "Deletando Pallet" });

        const response = await deletePallet(PalletSelecionado.id_pallet);

        if (response.sucesso) {
            carregaPallet(registrosPorPagina, listaPallet?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setPalletSelecionado(null);
            toast({
                mensagem: "Pallet deletado com sucesso.",
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

                {!listaPallet.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhum Pallet Cadastrado"
                            botao={true}
                            acao={handleNovoPallet}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Pallet"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoPallet}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Área de armazenagem</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Agrupador</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Status</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Qtd. Utilizado</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Última movimentação</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listaPallet.map((item: palletListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.id_pallet}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.id_pallet}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.id_areaarmazenagem}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.id_agrupador}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.fg_status}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.qt_utilizacao}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.dt_ultimamovimentacao}
                                                </Tabela.Body.Linha.Coluna>
                                                
                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarPallet(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeletePallet(item)} />
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
                                    carregaPallet(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaPallet(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaPallet(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${PalletSelecionado?.id_pallet}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o Pallet: ${PalletSelecionado?.id_pallet}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeletePallet} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            {/* <ModalPallet
                open={openModal}
                setOpen={setOpenModal}
                palletSelecionado={PalletSelecionado}
                setPalletSelecionado={setPalletSelecionado}
                carregaPallets={carregaPallet}
            /> */}
        </>
    );
}