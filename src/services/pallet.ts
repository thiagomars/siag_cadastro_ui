import { palletCadastro, palletFiltroSelect, palletFiltrosListagem } from "../types/pallet.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postPallets = async (palletCadastro: palletCadastro) => {
  return await postRequest(`/Pallet`, palletCadastro);
};

export const getListPallet = async (filtros: palletFiltrosListagem) => {
  return await postRequest(`/Pallet/Listagem`, filtros);
};

export const getImpressaoPallet = async (filtros: palletFiltrosListagem) => {
  return await postRequest(`/pallet/Impressao`, filtros);
}

export const getPalletById = async (id: number) => {
  return await getRequest(`/Pallet/${id}`);
};

export const putPallet = async (dados: palletCadastro) => {
  return await putRequest(`/Pallet`, dados);
};

export const deletePallet = async (id: number) => {
    return await deleteRequest(`/Pallet/${id}`);
};

export const getSelectPallet = async (pesquisa: palletFiltroSelect) => {
  return await postRequest(`/Cadastro/Pallet/Select`, pesquisa);
};
