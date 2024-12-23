import { baseEntity, baseFiltros } from "./baseEntity.d";

export type ufListagem = {
    nm_uf: string;
    nm_nomeuf: string;

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type ufCadastro = {
    nm_uf: string;
    nm_nomeuf: string;
}

export type ufForm = {
    nm_uf: string;
    nm_nomeuf: string;
}

export type ufFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type ufFiltroSelect = {
    pesquisa?: string | null;
}