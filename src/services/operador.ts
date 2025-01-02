import { operadorCadastro, operadorFiltroSelect, operadorFiltrosListagem } from "../types/operador.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postOperadors = async (operadorCadastro: operadorCadastro) => {
  return await postRequest(`/Operador`, operadorCadastro);
};

export const getListOperador = async (filtros: operadorFiltrosListagem) => {
  return await postRequest(`/Operador/Listagem`, filtros);
};

export const getOperadorById = async (id: string) => {
  return await getRequest(`/Operador/${id}`);
};

export const putOperador = async (dados: operadorCadastro) => {
  return await putRequest(`/Operador`, dados);
};

export const deleteOperador = async (id: string) => {
    return await deleteRequest(`/Operador/${id}`);
};

export const getSelectOperador = async (pesquisa: operadorFiltroSelect) => {
  return await postRequest(`/Operador/Select`, pesquisa);
};
