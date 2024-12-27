import { agrupadorAtivoCadastro, agrupadorAtivoFiltroSelect, agrupadorAtivoFiltrosListagem } from "../types/agrupadorAtivo.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postAgrupadorAtivos = async (agrupadorAtivoCadastro: agrupadorAtivoCadastro) => {
  return await postRequest(`/AgrupadorAtivo`, agrupadorAtivoCadastro);
};

export const getListAgrupadorAtivo = async (filtros: agrupadorAtivoFiltrosListagem) => {
  return await postRequest(`/AgrupadorAtivo/Listagem`, filtros);
};

export const getImpressaoAgrupadorAtivo = async (filtros: agrupadorAtivoFiltrosListagem) => {
  return await postRequest(`/agrupadorAtivo/Impressao`, filtros);
}

export const getAgrupadorAtivoById = async (id: number) => {
  return await getRequest(`/AgrupadorAtivo/${id}`);
};

export const putAgrupadorAtivo = async (dados: agrupadorAtivoCadastro) => {
  return await putRequest(`/AgrupadorAtivo`, dados);
};

export const deleteAgrupadorAtivo = async (id: number) => {
    return await deleteRequest(`/AgrupadorAtivo/${id}`);
};

export const getSelectAgrupadorAtivo = async (pesquisa: agrupadorAtivoFiltroSelect) => {
  return await postRequest(`/AgrupadorAtivo/Select`, pesquisa);
};
