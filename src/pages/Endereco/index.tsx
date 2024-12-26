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

import ModalEndereco from "./modal";

import { deleteEndereco, getListEndereco } from "../../services/endereco";
import { enderecoFiltrosListagem, enderecoListagem } from "../../types/endereco.d";

export default function Endereco(): JSX.Element {
    const toast = useToastLoading();

    const [listaEndereco, setListaEndereco] = useState<Array<enderecoListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [EnderecoSelecionado, setEnderecoSelecionado] = useState<enderecoListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<enderecoFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaEndereco = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: enderecoFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListEndereco(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaEndereco(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaEndereco, 500);

    function handleNovoEndereco(): void {
        setEnderecoSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarEndereco(dados: enderecoListagem): void {
        setEnderecoSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handleDeleteEndereco(dados: enderecoListagem): void {
        setEnderecoSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteEndereco() {
        if (EnderecoSelecionado == null)
            return;

        toast({ mensagem: "Deletando Endereço" });

        const response = await deleteEndereco(EnderecoSelecionado.enderecoId);

        if (response.sucesso) {
            carregaEndereco(registrosPorPagina, listaEndereco?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setEnderecoSelecionado(null);
            toast({
                mensagem: "Endereço deletado com sucesso.",
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

                {!listaEndereco.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhum Endereço Cadastrado"
                            botao={true}
                            acao={handleNovoEndereco}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Endereço"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoEndereco}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Descrição</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Trabalho</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Tipo Endereço</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Estoque</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Preenchimento</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Status</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listaEndereco.map((item: enderecoListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.enderecoId}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.enderecoId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.nmEndereco}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    <div>
                                                        <p>Setor: {item?.setorTrabalho?.nmSetorTrabalho}</p>
                                                        <p>Região: {item?.regiaoTrabalho?.nmRegiaoTrabalho}</p>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.tipoEndereco?.nmTipoEndereco}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    <div>
                                                        <p>Máx. {item.qtEstoqueMaximo}</p>
                                                        <p>Min. {item.qtEstoqueMinimo}</p>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    {item.tpPreenchimento}
                                                </Tabela.Body.Linha.Coluna>
                                                
                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    {item.fgStatus}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarEndereco(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteEndereco(item)} />
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
                                    carregaEndereco(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaEndereco(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaEndereco(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${EnderecoSelecionado?.nmEndereco}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o Endereço: ${EnderecoSelecionado?.nmEndereco}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteEndereco} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <ModalEndereco
                open={openModal}
                setOpen={setOpenModal}
                enderecoSelecionado={EnderecoSelecionado}
                setEnderecoSelecionado={setEnderecoSelecionado}
                carregaEnderecos={carregaEndereco}
            />
        </>
    );
}