import {
    areaArmazenagemCadastro,
    areaArmazenagemFiltroSelect,
    areaArmazenagemFiltrosListagem,
} from "../types/areaArmazenagem.d";
import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest,
} from "../utils/axiosRequest";

export const postAreaArmazenagems = async (
    areaArmazenagemCadastro: areaArmazenagemCadastro
) => {
    return await postRequest(`/AreaArmazenagem`, areaArmazenagemCadastro);
};

export const getListAreaArmazenagem = async (
    filtros: areaArmazenagemFiltrosListagem
) => {
    return await postRequest(`/AreaArmazenagem/Listagem`, filtros);
};

export const getImpressaoAreaArmazenagem = async (
    filtros: areaArmazenagemFiltrosListagem
) => {
    return await postRequest(`/areaArmazenagem/Impressao`, filtros);
};

export const getAreaArmazenagemById = async (id: number) => {
    return await getRequest(`/AreaArmazenagem/${id}`);
};

export const putAreaArmazenagem = async (dados: areaArmazenagemCadastro) => {
    return await putRequest(`/AreaArmazenagem`, dados);
};

export const deleteAreaArmazenagem = async (id: number) => {
    return await deleteRequest(`/AreaArmazenagem/${id}`);
};

export const getSelectAreaArmazenagem = async (
    pesquisa: areaArmazenagemFiltroSelect
) => {
    return await postRequest(`/Cadastro/AreaArmazenagem/Select`, pesquisa);
};

export const getTiposStatusAreaArmazenagem = async () => {
    return await getRequest(`/AreaArmazenagem/Status`);
};

export const getStatusGaiolas = async (id: number) => {
    return await getRequest(`/AreaArmazenagem/${id}/Status`);
};
