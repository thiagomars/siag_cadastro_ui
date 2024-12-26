import { baseFiltros } from "./baseEntity.d";

export type depositoListagem = {
    depositoId: number;
    nmDeposito: string;
};

export type depositoCadastro = {
    depositoId: number;
    nmDeposito: string;
}

export type depositoForm = {
    depositoId: number;
    nmDeposito: string;
}

export type depositoFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type depositoFiltroSelect = {
    pesquisa?: string | null;
}