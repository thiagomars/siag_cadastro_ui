import { parametroCadastro, parametroFiltroSelect, parametroFiltrosListagem } from "../types/parametro.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postParametros = async (parametroCadastro: parametroCadastro) => {
  return await postRequest(`/Parametro`, parametroCadastro);
};

export const getListParametro = async (filtros: parametroFiltrosListagem) => {
  return await postRequest(`/Parametro/Listagem`, filtros);
};

export const getParametroById = async (id: string) => {
  return await getRequest(`/Parametro/${id}`);
};

export const putParametro = async (dados: parametroCadastro) => {
  return await putRequest(`/Parametro`, dados);
};

export const deleteParametro = async (id: string) => {
    return await deleteRequest(`/Parametro/${id}`);
};

export const getSelectParametro = async (pesquisa: parametroFiltroSelect) => {
  return await postRequest(`/Parametro/Select`, pesquisa);
};
