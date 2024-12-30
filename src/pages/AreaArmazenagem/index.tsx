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

import ModalAreaArmazenagem from "./modal";

import { deleteAreaArmazenagem, getListAreaArmazenagem } from "../../services/areaArmazenagem";
import { areaArmazenagemFiltrosListagem, areaArmazenagemListagem } from "../../types/areaArmazenagem.d";

export default function AreaArmazenagem(): JSX.Element {
    const toast = useToastLoading();

    const [listaAreaArmazenagem, setListaAreaArmazenagem] = useState<Array<areaArmazenagemListagem>>([]);
    const [confirmacaoDeletar, setConfirmacaoDeletar] = useState<boolean>(false);
    const [AreaArmazenagemSelecionado, setAreaArmazenagemSelecionado] = useState<areaArmazenagemListagem | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingListagem, setLoadingListagem] = useState<boolean>(true);

    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [totalRegistros, setTotalRegistros] = useState<number>(0);
    const [totalPaginas, setTotalPaginas] = useState<number>(0);
    const registrosPorPagina: number = 10;

    const { watch, register, handleSubmit } = useForm<areaArmazenagemFiltrosListagem>();
    const hookFiltroWatch = watch();

    useEffect(() => {
        filtroDebounce();
    }, [])

    useEffect(() => {
        const subscription = watch(() => filtroDebounce());
        return () => subscription.unsubscribe();
    }, [hookFiltroWatch]);

    const carregaAreaArmazenagem = async (
        pageSize: number = registrosPorPagina,
        currentPage: number = 0
    ): Promise<void> => {
        let filtros: areaArmazenagemFiltrosListagem = {
            pageSize,
            currentPage
        };
        await handleSubmit(dados => {
            filtros = {
                ...filtros,
                pesquisa: dados.pesquisa,
            }
        })();

        const request = () => getListAreaArmazenagem(filtros);
        setLoadingListagem(true);
        const response = await request();

        if (response.sucesso) {
            setPaginaAtual(response.dados.currentPage);
            setTotalRegistros(response.dados.totalRegisters);
            setTotalPaginas(response.dados.totalPages);

            setListaAreaArmazenagem(response.dados.dados);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setOpenModal(false);
        setLoading(false);
        setLoadingListagem(false);
    };

    const filtroDebounce = useDebounce(carregaAreaArmazenagem, 500);

    function handleNovoAreaArmazenagem(): void {
        setAreaArmazenagemSelecionado(null);
        setOpenModal(true);
    }

    function handleEditarAreaArmazenagem(dados: areaArmazenagemListagem): void {
        setAreaArmazenagemSelecionado({ ...dados });
        setOpenModal(true);
    }

    function handleDeleteAreaArmazenagem(dados: areaArmazenagemListagem): void {
        setAreaArmazenagemSelecionado({ ...dados });
        setConfirmacaoDeletar(true);
    }

    async function confirmDeleteAreaArmazenagem() {
        if (AreaArmazenagemSelecionado == null)
            return;

        toast({ mensagem: "Deletando Área de Armazenagem" });

        const response = await deleteAreaArmazenagem(AreaArmazenagemSelecionado.agrupadorId);

        if (response.sucesso) {
            carregaAreaArmazenagem(registrosPorPagina, listaAreaArmazenagem?.length == 1 && paginaAtual > 0 ? paginaAtual - 1 : paginaAtual);

            setAreaArmazenagemSelecionado(null);
            toast({
                mensagem: "Área de Armazenagem deletado com sucesso.",
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

                {!listaAreaArmazenagem.length ? (
                    <Box>
                        <EmptyPage
                            texto="Nenhuma Área de Armazenagem Cadastrada"
                            botao={true}
                            acao={handleNovoAreaArmazenagem}
                        />
                    </Box>
                ) : (
                    <Box>
                        <>
                            <Tabela
                                titulo="Área de Armazenagem"
                                botoes={
                                    <>
                                        <Botao
                                            texto="Adicionar"
                                            tipo="sucesso"
                                            onClick={handleNovoAreaArmazenagem}

                                        />
                                    </>
                                }
                            >
                                <Tabela.Header>
                                    <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Identificação</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Endereço</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Agrupador</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Posição</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna>Lado</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Status</Tabela.Header.Coluna>
                                    <Tabela.Header.Coluna alignText="text-center">Ações</Tabela.Header.Coluna>
                                </Tabela.Header>

                                <Tabela.Body>
                                    {listaAreaArmazenagem.map((item: areaArmazenagemListagem) => {
                                        return (
                                            <Tabela.Body.Linha key={item.agrupadorId}>
                                                <Tabela.Body.Linha.Coluna>
                                                    {item.agrupadorId}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    <div>
                                                        <p>{item.cdIdentificacao}</p>
                                                        <p>{item.tipoArea?.nmTipoArea}</p>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    <div>
                                                        <p>{item.endereco?.nmEndereco}</p>
                                                        <p>{item.endereco?.regiaoTrabalho?.nmRegiaoTrabalho}</p>
                                                        <p>{item.endereco?.setorTrabalho?.nmSetorTrabalho}</p>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    <div>
                                                        <p>{item?.agrupador?.tpAgrupamento}</p>
                                                        <p>{item?.agrupador?.cdSequencia}</p>
                                                        <p>{item?.agrupador?.dtAgrupador?.toString()}</p>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna>
                                                    <div>
                                                        <p>{item.nrPosicaoX}</p>
                                                        <p>{item.nrPosicaoY}</p>
                                                    </div>
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    {item.nrLado}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    {item.fgStatus}
                                                </Tabela.Body.Linha.Coluna>

                                                <Tabela.Body.Linha.Coluna alignText="text-center">
                                                    <MenuDropdown>
                                                        <MenuDropdown.Opcao tipo="editar" ativo={true} acaoBotao={() => handleEditarAreaArmazenagem(item)} />
                                                        <MenuDropdown.Opcao tipo="excluir" ativo={true} acaoBotao={() => handleDeleteAreaArmazenagem(item)} />
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
                                    carregaAreaArmazenagem(registrosPorPagina, paginaAtual - 1);
                                }}
                                onClickPaginaPosterior={() => {
                                    setPaginaAtual(paginaAtual + 1);
                                    carregaAreaArmazenagem(registrosPorPagina, paginaAtual + 1);
                                }}
                                onClickPagina={(pagina: number) => {
                                    setPaginaAtual(pagina);
                                    carregaAreaArmazenagem(registrosPorPagina, pagina);
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
                <Modal.Titulo texto={`Deletar ${AreaArmazenagemSelecionado?.cdIdentificacao}`} />
                <Modal.Descricao texto={`Deseja realmente deletar o Área de Armazenagem: ${AreaArmazenagemSelecionado?.cdIdentificacao}?`} />

                <Modal.ContainerBotoes>
                    <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteAreaArmazenagem} />
                    <Modal.BotaoCancelar />
                </Modal.ContainerBotoes>
            </Modal>

            <ModalAreaArmazenagem
                open={openModal}
                setOpen={setOpenModal}
                areaArmazenagemSelecionado={AreaArmazenagemSelecionado}
                setAreaArmazenagemSelecionado={setAreaArmazenagemSelecionado}
                carregaAreaArmazenagems={carregaAreaArmazenagem}
            />
        </>
    );
}