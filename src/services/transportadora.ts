import { TransportadoraCadastro, TransportadoraFiltroSelect, TransportadoraFiltrosListagem } from "../types/transportadora.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postTransportadoras = async (TransportadoraCadastro: TransportadoraCadastro) => {
  return await postRequest(`/Transportadora`, TransportadoraCadastro);
};

export const getListTransportadora = async (filtros: TransportadoraFiltrosListagem) => {
  return await postRequest(`/Transportadora/Listagem`, filtros);
};

export const getTransportadoraById = async (id: string) => {
  return await getRequest(`/Transportadora/${id}`);
};

export const putTransportadora = async (dados: TransportadoraCadastro) => {
  return await putRequest(`/Transportadora`, dados);
};

export const deleteTransportadora = async (id: string) => {
    return await deleteRequest(`/Transportadora/${id}`);
};

export const getSelectTransportadora = async (pesquisa: TransportadoraFiltroSelect) => {
  return await postRequest(`/Transportadora/Select`, pesquisa);
};
