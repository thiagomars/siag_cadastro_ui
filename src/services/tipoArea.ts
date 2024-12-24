import { tipoAreaCadastro, tipoAreaFiltroSelect, tipoAreaFiltrosListagem } from "../types/tipoArea.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postTipoAreas = async (tipoAreaCadastro: tipoAreaCadastro) => {
  return await postRequest(`/TipoArea`, tipoAreaCadastro);
};

export const getListTipoArea = async (filtros: tipoAreaFiltrosListagem) => {
  return await postRequest(`/TipoArea/Listagem`, filtros);
};

export const getImpressaoTipoArea = async (filtros: tipoAreaFiltrosListagem) => {
  return await postRequest(`/tipoArea/Impressao`, filtros);
}

export const getTipoAreaById = async (id: number) => {
  return await getRequest(`/TipoArea/${id}`);
};

export const putTipoArea = async (dados: tipoAreaCadastro) => {
  return await putRequest(`/TipoArea`, dados);
};

export const deleteTipoArea = async (id: number) => {
    return await deleteRequest(`/TipoArea/${id}`);
};

export const getSelectTipoArea = async (pesquisa: tipoAreaFiltroSelect) => {
  return await postRequest(`/Cadastro/TipoArea/Select`, pesquisa);
};
