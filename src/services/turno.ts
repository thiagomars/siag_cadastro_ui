import { TurnoCadastro, TurnoFiltroSelect, TurnoFiltrosListagem } from "../types/turno.d";
import { deleteRequest, getRequest, postRequest, putRequest } from "../utils/axiosRequest";

export const postTurnos = async (TurnoCadastro: TurnoCadastro) => {
  return await postRequest(`/Turno`, TurnoCadastro);
};

export const getListTurno = async (filtros: TurnoFiltrosListagem) => {
  return await postRequest(`/Turno/Listagem`, filtros);
};

export const getTurnoById = async (id: string) => {
  return await getRequest(`/Turno/${id}`);
};

export const putTurno = async (dados: TurnoCadastro) => {
  return await putRequest(`/Turno`, dados);
};

export const deleteTurno = async (id: string) => {
    return await deleteRequest(`/Turno/${id}`);
};

export const getSelectTurno = async (pesquisa: TurnoFiltroSelect) => {
  return await postRequest(`/Turno/Select`, pesquisa);
};
