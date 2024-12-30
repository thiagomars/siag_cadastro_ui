import { ufCadastro, ufFiltroSelect, ufFiltrosListagem } from "../types/uf.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postUfs = async (ufCadastro: ufCadastro) => {
  return await postRequest(`/Uf`, ufCadastro);
};

export const getListUf = async (filtros: ufFiltrosListagem) => {
  return await postRequest(`/Uf/Listagem`, filtros);
};

export const getImpressaoUf = async (filtros: ufFiltrosListagem) => {
  return await postRequest(`/uf/Impressao`, filtros);
}

export const getUfById = async (id: string) => {
  return await getRequest(`/Uf/${id}`);
};

export const putUf = async (dados: ufCadastro) => {
  return await putRequest(`/Uf`, dados);
};

export const deleteUf = async (id: string) => {
    return await deleteRequest(`/Uf/${id}`);
};

export const getSelectUf = async (pesquisa: ufFiltroSelect) => {
  return await postRequest(`/Uf/Select`, pesquisa);
};
