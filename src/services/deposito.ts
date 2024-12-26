import { depositoCadastro, depositoFiltroSelect, depositoFiltrosListagem } from "../types/deposito.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postDepositos = async (depositoCadastro: depositoCadastro) => {
  return await postRequest(`/Deposito`, depositoCadastro);
};

export const getListDeposito = async (filtros: depositoFiltrosListagem) => {
  return await postRequest(`/Deposito/Listagem`, filtros);
};

export const getImpressaoDeposito = async (filtros: depositoFiltrosListagem) => {
  return await postRequest(`/deposito/Impressao`, filtros);
}

export const getDepositoById = async (id: number) => {
  return await getRequest(`/Deposito/${id}`);
};

export const putDeposito = async (dados: depositoCadastro) => {
  return await putRequest(`/Deposito`, dados);
};

export const deleteDeposito = async (id: number) => {
    return await deleteRequest(`/Deposito/${id}`);
};

export const getSelectDeposito = async (pesquisa: depositoFiltroSelect) => {
  return await postRequest(`/Deposito/Select`, pesquisa);
};
