import { enderecoCadastro, enderecoFiltroSelect, enderecoFiltrosListagem } from "../types/endereco.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postEnderecos = async (enderecoCadastro: enderecoCadastro) => {
  return await postRequest(`/Endereco`, enderecoCadastro);
};

export const getListEndereco = async (filtros: enderecoFiltrosListagem) => {
  return await postRequest(`/Endereco/Listagem`, filtros);
};

export const getImpressaoEndereco = async (filtros: enderecoFiltrosListagem) => {
  return await postRequest(`/endereco/Impressao`, filtros);
}

export const getEnderecoById = async (id: number) => {
  return await getRequest(`/Endereco/${id}`);
};

export const putEndereco = async (dados: enderecoCadastro) => {
  return await putRequest(`/Endereco`, dados);
};

export const deleteEndereco = async (id: number) => {
    return await deleteRequest(`/Endereco/${id}`);
};

export const getSelectEndereco = async (pesquisa: enderecoFiltroSelect) => {
  return await postRequest(`/Endereco/Select`, pesquisa);
};
