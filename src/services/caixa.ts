import { FiltroCaixaPedido } from "../types/caixa.d";
import { postRequest } from "../utils/axiosRequest";

export const getListaCaixasPedidos = async (filtro: FiltroCaixaPedido) => {
    return await postRequest("Caixa/pedido", filtro);
};
