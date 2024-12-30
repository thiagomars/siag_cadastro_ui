import { CaixaPedido } from "./caixa.d"
import { Pedido } from "./pedido.d"

export type ListaCaixasPedidos = {
    caixas: Array<CaixaPedido>,
    pedidos: Array<Pedido>
}