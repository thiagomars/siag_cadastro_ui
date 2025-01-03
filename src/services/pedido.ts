import { pedidoFiltroSelect } from "../types/pedido.d";
import { postRequest } from "../utils/axiosRequest";

export const getSelectPedido = async (pesquisa: pedidoFiltroSelect) => {
  return await postRequest(`/Pedido/Select`, pesquisa);
};
