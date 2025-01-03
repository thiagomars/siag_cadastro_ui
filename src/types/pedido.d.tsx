export type Pedido = {
    idPedido: string;
    codigoPedido: string;
    codigoLote: string;
    box: string;
    quantidadeCaixas: number;
}

export type pedidoFiltroSelect = {
    pesquisa?: string | null;
}