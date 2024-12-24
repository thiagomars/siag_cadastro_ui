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

import ModalTipoEndereco from "./modal";

import { deleteTipoEndereco, getListTipoEndereco } from "../../services/tipoEndereco.ts";
import { tipoEnderecoFiltrosListagem, tipoEnderecoListagem } from "../../types/tipoEndereco.d";

export default function TipoEndereco(): JSX.Element {
    const toast = useToastLoading();

    const [listaTipoEndereco, setListaTipoEndereco] = useState<Array<tipoEnderecoListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [TipoEnderecoSelecionado, setTipoEnderecoSelecionado] = useState<tipoEnderecoListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<tipoEnderecoFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaTipoEndereco = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: tipoEnderecoFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListTipoEndereco(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaTipoEndereco(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaTipoEndereco, 500);

    function handleNovoTipoEndereco(): void {
        setTipoEnderecoSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarTipoEndereco(dados: tipoEnderecoListagem): void {
        setTipoEnderecoSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handleDeleteTipoEndereco(dados: tipoEnderecoListagem): void {
        setTipoEnderecoSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteTipoEndereco() {
        if (TipoEnderecoSelecionado == null)
            return;

        toast({ mensagem: "Deletando Tipo Endereço" });

        const response = await deleteTipoEndereco(TipoEnderecoSelecionado.tipoEnderecoId);

        if (response.sucesso) {
            carregaTipoEndereco(registrosPorPagina, listaTipoEndereco?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setTipoEnderecoSelecionado(null);
            toast({
                mensagem: "Tipo Endereço deletado com sucesso.",
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

                {!listaTipoEndereco.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhum Tipo de Endereço Cadastrado"
                            botao={true}
                            acao={handleNovoTipoEndereco}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Tipo de Endereço"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoTipoEndereco}

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
                                    {listaTipoEndereco.map((item: tipoEnderecoListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.tipoEnderecoId}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.tipoEnderecoId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmTipoEndereco}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarTipoEndereco(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteTipoEndereco(item)} />
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
                                    carregaTipoEndereco(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaTipoEndereco(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaTipoEndereco(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${TipoEnderecoSelecionado?.nmTipoEndereco}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o Tipo de Endereço: ${TipoEnderecoSelecionado?.nmTipoEndereco}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteTipoEndereco} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <ModalTipoEndereco
                open={openModal}
                setOpen={setOpenModal}
                tipoEnderecoSelecionado={TipoEnderecoSelecionado}
                setTipoEnderecoSelecionado={setTipoEnderecoSelecionado}
                carregaTipoEnderecos={carregaTipoEndereco}
            />
        </>
    );
}