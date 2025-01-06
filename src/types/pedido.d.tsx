export type Pedido = {
    idPedido: string;
    cdPedido: string;
    cdLote: string;
    cdBox: string;
    nrCaixas: number;
}

export type pedidoFiltroSelect = {
    pesquisa?: string | null;
}