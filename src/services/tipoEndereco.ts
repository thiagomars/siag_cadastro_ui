import { tipoEnderecoCadastro, tipoEnderecoFiltroSelect, tipoEnderecoFiltrosListagem } from "../types/tipoEndereco.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postTipoEnderecos = async (tipoEnderecoCadastro: tipoEnderecoCadastro) => {
  return await postRequest(`/TipoEndereco`, tipoEnderecoCadastro);
};

export const getListTipoEndereco = async (filtros: tipoEnderecoFiltrosListagem) => {
  return await postRequest(`/TipoEndereco/Listagem`, filtros);
};

export const getImpressaoTipoEndereco = async (filtros: tipoEnderecoFiltrosListagem) => {
  return await postRequest(`/tipoEndereco/Impressao`, filtros);
}

export const getTipoEnderecoById = async (id: number) => {
  return await getRequest(`/TipoEndereco/${id}`);
};

export const putTipoEndereco = async (dados: tipoEnderecoCadastro) => {
  return await putRequest(`/TipoEndereco`, dados);
};

export const deleteTipoEndereco = async (id: number) => {
    return await deleteRequest(`/TipoEndereco/${id}`);
};

export const getSelectTipoEndereco = async (pesquisa: tipoEnderecoFiltroSelect) => {
  return await postRequest(`/TipoEndereco/Select`, pesquisa);
};
