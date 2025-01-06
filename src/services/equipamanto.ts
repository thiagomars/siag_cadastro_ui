import { enderecoFiltroSelect } from "../types/endereco.d";
import { postRequest } from "../utils/axiosRequest";

export const getSelectEquipamanto = async (pesquisa: enderecoFiltroSelect) => {
  return await postRequest(`/Equipamento/Select`, pesquisa);
};
