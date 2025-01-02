import { ProgramaCadastro, ProgramaFiltroSelect, ProgramaFiltrosListagem } from "../types/programa.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postProgramas = async (ProgramaCadastro: ProgramaCadastro) => {
  return await postRequest(`/Programa`, ProgramaCadastro);
};

export const getListPrograma = async (filtros: ProgramaFiltrosListagem) => {
  return await postRequest(`/Programa/Listagem`, filtros);
};

export const getProgramaById = async (id: string) => {
  return await getRequest(`/Programa/${id}`);
};

export const putPrograma = async (dados: ProgramaCadastro) => {
  return await putRequest(`/Programa`, dados);
};

export const deletePrograma = async (id: string) => {
    return await deleteRequest(`/Programa/${id}`);
};

export const getSelectPrograma = async (pesquisa: ProgramaFiltroSelect) => {
  return await postRequest(`/Programa/Select`, pesquisa);
};
