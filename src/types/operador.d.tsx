import { baseEntity, baseFiltros } from "./baseEntity.d";

export type operadorListagem = {
    operadorId: number;
    nmOperador: string;
    nmCpf: string;
    nrLocalidade: number;
    dtLogin: Date;
    fgFuncao: number;
    idResponsavel: number;
    nmLogin: string;
    nmNfcoperador: string;

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type operadorCadastro = {
    operadorId: number;
    nmOperador: string;
    nmCpf: string;
    nrLocalidade: number;
    dtLogin: Date;
    fgFuncao: number;
    idResponsavel: number;
    nmLogin: string;
    nmNfcoperador: string;
}

export type operadorForm = {
    operadorId: number;
    nmOperador: string;
    nmCpf: string;
    nrLocalidade: number;
    dtLogin: Date;
    fgFuncao: number;
    idResponsavel: number;
    nmLogin: string;
    nmNfcoperador: string;
}

export type operadorFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type operadorFiltroSelect = {
    pesquisa?: string | null;
}