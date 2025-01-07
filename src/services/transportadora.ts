import { transportadoraCadastro, transportadoraFiltroSelect, transportadoraFiltrosListagem } from "../types/transportadora.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postTransportadoras = async (TransportadoraCadastro: transportadoraCadastro) => {
  return await postRequest(`/Transportadora`, TransportadoraCadastro);
};

export const getListTransportadora = async (filtros: transportadoraFiltrosListagem) => {
  return await postRequest(`/Transportadora/Listagem`, filtros);
};

export const getTransportadoraById = async (id: number) => {
  return await getRequest(`/Transportadora/${id}`);
};

export const putTransportadora = async (dados: transportadoraCadastro) => {
  return await putRequest(`/Transportadora`, dados);
};

export const deleteTransportadora = async (id: number) => {
    return await deleteRequest(`/Transportadora/${id}`);
};

export const getSelectTransportadora = async (pesquisa: transportadoraFiltroSelect) => {
  return await postRequest(`/Transportadora/Select`, pesquisa);
};
