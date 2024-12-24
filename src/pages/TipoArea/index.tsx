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

import ModalTipoArea from "./modal";

import { deleteTipoArea, getListTipoArea } from "../../services/tipoArea";
import { tipoAreaFiltrosListagem, tipoAreaListagem } from "../../types/tipoArea.d";

export default function TipoArea(): JSX.Element {
    const toast = useToastLoading();

    const [listaTipoArea, setListaTipoArea] = useState<Array<tipoAreaListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [TipoAreaSelecionado, setTipoAreaSelecionado] = useState<tipoAreaListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<tipoAreaFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaTipoArea = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: tipoAreaFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListTipoArea(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaTipoArea(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaTipoArea, 500);

    function handleNovoTipoArea(): void {
        setTipoAreaSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarTipoArea(dados: tipoAreaListagem): void {
        setTipoAreaSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handleDeleteTipoArea(dados: tipoAreaListagem): void {
        setTipoAreaSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteTipoArea() {
        if (TipoAreaSelecionado == null)
            return;

        toast({ mensagem: "Deletando Tipo Área" });

        const response = await deleteTipoArea(TipoAreaSelecionado.tipoAreaId);

        if (response.sucesso) {
            carregaTipoArea(registrosPorPagina, listaTipoArea?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setTipoAreaSelecionado(null);
            toast({
                mensagem: "Tipo Área deletado com sucesso.",
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

                {!listaTipoArea.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhum Tipo de Área Cadastrado"
                            botao={true}
                            acao={handleNovoTipoArea}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Tipo de Área"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoTipoArea}

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
                                    {listaTipoArea.map((item: tipoAreaListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.tipoAreaId}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.tipoAreaId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmTipoArea}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarTipoArea(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteTipoArea(item)} />
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
                                    carregaTipoArea(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaTipoArea(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaTipoArea(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${TipoAreaSelecionado?.nmTipoArea}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o Tipo de Área: ${TipoAreaSelecionado?.nmTipoArea}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteTipoArea} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <ModalTipoArea
                open={openModal}
                setOpen={setOpenModal}
                tipoAreaSelecionado={TipoAreaSelecionado}
                setTipoAreaSelecionado={setTipoAreaSelecionado}
                carregaTipoAreas={carregaTipoArea}
            />
        </>
    );
}