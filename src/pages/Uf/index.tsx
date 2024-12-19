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

import ModalUf from "./modal";

import { deleteUf, getListUf } from "../../services/uf";
import SelectAtivo from "../../templates/selects/AtivoSelect";
import TagAtivo from "../../templates/tags/AtivoTag";
import TagUltimaAlteracao from "../../templates/tags/UltimaAlteracaoTag";
import { ufFiltrosListagem, ufListagem } from "../../types/uf.d";

export default function Uf(): JSX.Element {
    const toast = useToastLoading();

    const [listaUf, setListaUf] = useState<Array<ufListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [UfSelecionado, setUfSelecionado] = useState<ufListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { control, watch, register, handleSubmit } = useForm<ufFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaUf = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: ufFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
                ativo: dados.ativo?.value,
            }
        })();

        const request = () => getListUf(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaUf(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaUf, 500);

    function handleNovoUf(): void {
        setUfSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarUf(dados: ufListagem): void {
        setUfSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handleDeleteUf(dados: ufListagem): void {
        setUfSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteUf() {
        if (UfSelecionado == null)
            return;

        toast({ mensagem: "Deletando Uf" });

        const response = await deleteUf(UfSelecionado.id);

        if (response.sucesso) {
            carregaUf(registrosPorPagina, listaUf?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setUfSelecionado(null);
            toast({
                mensagem: "Uf deletado com sucesso.",
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
                    <Formulario className="md:grid-cols-3">
                        <Formulario.InputTexto
                            name="pesquisa"
                            opcional={true}
                            label="Pesquisa"
                            placeholder="Pesquisar..."
                            subTitulo="(Id, Descrição, Sigla, Código IBGE)"
                            register={register}
                            className="col-span-1 md:col-span-2"
                            isFiltro
                        />
                        <SelectAtivo
                            control={control}
                            opcional={true}
                            className='col-span-1'
                            isFiltro
                        />
                    </Formulario>

                </Box>

                {!listaUf.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhuma UF Cadastrada"
                            botao={true}
                            acao={handleNovoUf}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Unidade Federativa - UF"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoUf}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Descrição</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Sigla</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Cod. IBGE</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Status</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Alterações</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listaUf.map((item: ufListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.id}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.id}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.descricao}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.sigla}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    {item.codigoIbge}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <TagAtivo ativo={item.ativo} />
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <TagUltimaAlteracao
                                                        usuarioUltimaAlteracao={item.usuarioUltimaAlteracao}
                                                        dataUltimaAlteracao={item.dataUltimaAlteracao}
                                                    />
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarUf(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteUf(item)} />
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
                                    carregaUf(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaUf(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaUf(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${UfSelecionado?.descricao}`} />
                <Modal.Descricao texto={`Deseja realmente deletar a Unidade Federativa: ${UfSelecionado?.descricao}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteUf} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <ModalUf
                open={openModal}
                setOpen={setOpenModal}
                ufSelecionado={UfSelecionado}
                setUfSelecionado={setUfSelecionado}
                carregaUfs={carregaUf}
            />
        </>
    );
}