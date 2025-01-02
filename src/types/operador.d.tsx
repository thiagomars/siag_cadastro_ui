import { baseEntity, baseFiltros } from "./baseEntity.d";

export type operadorListagem = {
    id_operador: number;
    nm_operador: string;
    nm_login: string;
    dt_login: Date;

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type operadorCadastro = {
    id_operador: number;
    nm_operador: string;
    nm_login: string;
    nm_cpf: string;
}

export type operadorForm = {
    id_operador: number;
    nm_operador: string;
    nm_login: string;
    nm_cpf: string;
}

export type operadorFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type operadorFiltroSelect = {
    pesquisa?: string | null;
}