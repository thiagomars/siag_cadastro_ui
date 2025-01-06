import { atividadeCadastro, atividadeFiltroSelect, atividadeFiltrosListagem } from "../types/atividade.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postAtividades = async (atividadeCadastro: atividadeCadastro) => {
  return await postRequest(`/Atividade`, atividadeCadastro);
};

export const getListAtividade = async (filtros: atividadeFiltrosListagem) => {
  return await postRequest(`/Atividade/Listagem`, filtros);
};

export const getImpressaoAtividade = async (filtros: atividadeFiltrosListagem) => {
  return await postRequest(`/atividade/Impressao`, filtros);
}

export const getAtividadeById = async (id: number) => {
  return await getRequest(`/Atividade/${id}`);
};

export const putAtividade = async (dados: atividadeCadastro) => {
  return await putRequest(`/Atividade`, dados);
};

export const deleteAtividade = async (id: number) => {
    return await deleteRequest(`/Atividade/${id}`);
};

export const getSelectAtividade = async (pesquisa: atividadeFiltroSelect) => {
  return await postRequest(`/Atividade/Select`, pesquisa);
};
