import { baseFiltros } from "./baseEntity.d";

export type caixaListagem = {
    caixaId: number;
    nmCaixa: string;
};

export type caixaCadastro = {
    caixaId: number;
    nmCaixa: string;
}

export type caixaForm = {
    caixaId: number;
    nmCaixa: string;
}

export type caixaFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type caixaFiltroSelect = {
    pesquisa?: string | null;
}