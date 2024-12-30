import { regiaoTrabalhoCadastro, regiaoTrabalhoFiltroSelect, regiaoTrabalhoFiltrosListagem } from "../types/regiaoTrabalho.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postRegiaoTrabalhos = async (regiaoTrabalhoCadastro: regiaoTrabalhoCadastro) => {
  return await postRequest(`/RegiaoTrabalho`, regiaoTrabalhoCadastro);
};

export const getListRegiaoTrabalho = async (filtros: regiaoTrabalhoFiltrosListagem) => {
  return await postRequest(`/RegiaoTrabalho/Listagem`, filtros);
};

export const getImpressaoRegiaoTrabalho = async (filtros: regiaoTrabalhoFiltrosListagem) => {
  return await postRequest(`/regiaoTrabalho/Impressao`, filtros);
}

export const getRegiaoTrabalhoById = async (id: number) => {
  return await getRequest(`/RegiaoTrabalho/${id}`);
};

export const putRegiaoTrabalho = async (dados: regiaoTrabalhoCadastro) => {
  return await putRequest(`/RegiaoTrabalho`, dados);
};

export const deleteRegiaoTrabalho = async (id: number) => {
    return await deleteRequest(`/RegiaoTrabalho/${id}`);
};

export const getSelectRegiaoTrabalho = async (pesquisa: regiaoTrabalhoFiltroSelect) => {
  return await postRequest(`/RegiaoTrabalho/Select`, pesquisa);
};
