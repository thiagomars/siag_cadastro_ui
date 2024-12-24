import { baseEntity, baseFiltros } from "./baseEntity.d";

export type depositoListagem = {
    id_deposito: number;
    nm_nomedeposito: string;

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type depositoCadastro = {
    id_deposito: number;
    nm_nomedeposito: string;
}

export type depositoForm = {
    id_deposito: number;
    nm_nomedeposito: string;
}

export type depositoFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type depositoFiltroSelect = {
    pesquisa?: string | null;
}