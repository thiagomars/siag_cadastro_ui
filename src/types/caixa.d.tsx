import { agrupadorAtivoListagem } from "./agrupadorAtivo.d";
import { baseFiltros } from "./baseEntity.d";
import { palletListagem } from "./pallet.d";
import { ProgramaListagem } from "./programa.d";
import { typeSelectOptions } from "./select.d";

export type CaixaPedido = {
    codigo: string;
    produto: string;
    cor: string;
    gradeTamanho: string;
    pares: number;
}

export type FiltroCaixaPedido = {
    idPallet: Number;
}

export type caixaListagem = {
    caixaId: number;
    agrupadorId: number;
    agrupador: agrupadorAtivoListagem;
    palletId: number;
    pallet: palletListagem;
    programaId: number;
    programa: ProgramaListagem;
    pedidoId: number;
    // pedido: pedidoListagem;
    cdProduto: string;
    cdCor: string;
    cdGrudeTamanho: string;
    nrCaixa: number;
    nrPares: number;
    fgRfid: boolean;
    fgStatus: number;
    dtEmbalagem: Date | string;
    dtSorter: Date | string;
    dtEstufamento: Date | string;
    dtExpedicao: Date | string;
    qtPeso: number;
};

export type caixaCadastro = {
    caixaId: number;
    agrupadorId: number;
    palletId: number;
    programaId: number;
    pedidoId: number;
    cdProduto: string;
    cdCor: string;
    cdGrudeTamanho: string;
    nrCaixa: number;
    nrPares: number;
    fgRfid: boolean;
    fgStatus: number;
    dtEmbalagem: Date | string;
    dtSorter: Date | string;
    dtEstufamento: Date | string;
    dtExpedicao: Date | string;
    qtPeso: number;
}

export type caixaForm = {
    caixaId: number;
    agrupadorId: number;
    agrupador: typeSelectOptions;
    palletId: number;
    pallet: typeSelectOptions;
    programaId: number;
    programa: typeSelectOptions;
    pedidoId: number;
    pedido: typeSelectOptions;
    cdProduto: string;
    cdCor: string;
    cdGrudeTamanho: string;
    nrCaixa: number;
    nrPares: number;
    fgRfid: boolean;
    fgStatus: number;
    dtEmbalagem: Date | string;
    dtSorter: Date | string;
    dtEstufamento: Date | string;
    dtExpedicao: Date | string;
    qtPeso: number;
}

export type caixaFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type caixaFiltroSelect = {
    pesquisa?: string | null;
}