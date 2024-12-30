import {
    setorTrabalhoCadastro,
    setorTrabalhoFiltroSelect,
    setorTrabalhoFiltrosListagem,
} from "../types/setorTrabalho.d";
import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest,
} from "../utils/axiosRequest";

export const postSetorTrabalhos = async (
    setorTrabalhoCadastro: setorTrabalhoCadastro
) => {
    return await postRequest(`/SetorTrabalho`, setorTrabalhoCadastro);
};

export const getListSetorTrabalho = async (
    filtros: setorTrabalhoFiltrosListagem
) => {
    return await postRequest(`/SetorTrabalho/Listagem`, filtros);
};

export const getImpressaoSetorTrabalho = async (
    filtros: setorTrabalhoFiltrosListagem
) => {
    return await postRequest(`/setorTrabalho/Impressao`, filtros);
};

export const getSetorTrabalhoById = async (id: number) => {
    return await getRequest(`/SetorTrabalho/${id}`);
};

export const putSetorTrabalho = async (dados: setorTrabalhoCadastro) => {
    return await putRequest(`/SetorTrabalho`, dados);
};

export const deleteSetorTrabalho = async (id: number) => {
    return await deleteRequest(`/SetorTrabalho/${id}`);
};

export const getSelectSetorTrabalho = async (
    pesquisa: setorTrabalhoFiltroSelect
) => {
    return await postRequest(`/SetorTrabalho/Select`, pesquisa);
};

export const getListaSelectSetorTrabalho = async () => {
    return await getRequest("SetorTrabalho/Select");
};
