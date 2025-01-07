import { statusFiltroSelect } from "../types/status";
import { postRequest } from "../utils/axiosRequest";

export const getSelectRejeicaoTarefa = async (pesquisa: statusFiltroSelect) => {
  return await postRequest(`/Status/Select/RejeicaoTarefa`, pesquisa);
};

export const getSelectStatusEndereco = async (pesquisa: statusFiltroSelect) => {
  return await postRequest(`/Status/Select/Endereco`, pesquisa);
};

export const getSelectStatusAgrupadorAtivo = async (pesquisa: statusFiltroSelect) => {
  return await postRequest(`/Status/Select/AgrupadorAtivo`, pesquisa);
};

export const getSelectStatusAreaArmazenagem = async (pesquisa: statusFiltroSelect) => {
  return await postRequest(`/Status/Select/AreaArmazenagem`, pesquisa);
};
