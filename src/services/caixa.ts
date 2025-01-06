import {
    caixaCadastro,
    caixaFiltroSelect,
    caixaFiltrosListagem,
} from "../types/caixa.d";
import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest,
} from "../utils/axiosRequest";

export const postCaixas = async (caixaCadastro: caixaCadastro) => {
    return await postRequest(`/Caixa`, caixaCadastro);
};

export const getListCaixa = async (filtros: caixaFiltrosListagem) => {
    return await postRequest(`/Caixa/Listagem`, filtros);
};

export const getListaCaixaPedido = async (idPallet: number) => {
    return await getRequest(`/caixa-pedido/${idPallet}`);
};

export const getImpressaoCaixa = async (filtros: caixaFiltrosListagem) => {
    return await postRequest(`/caixa/Impressao`, filtros);
};

export const getCaixaById = async (id: number) => {
    return await getRequest(`/Caixa/${id}`);
};

export const putCaixa = async (dados: caixaCadastro) => {
    return await putRequest(`/Caixa`, dados);
};

export const deleteCaixa = async (id: number) => {
    return await deleteRequest(`/Caixa/${id}`);
};

export const getSelectCaixa = async (pesquisa: caixaFiltroSelect) => {
    return await postRequest(`/Caixa/Select`, pesquisa);
};
