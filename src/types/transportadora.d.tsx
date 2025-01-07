import { baseEntity, baseFiltros } from "./baseEntity.d";

export type transportadoraListagem = {
    transportadoraId: number;
    nmNomeEmpresa: string;
    nmNomeReduzido: string;
    nmLogradouro: string;
    nmBairro: string;
    nmCep: string;
    nmUf: string;
    nmMunicipio: string;
    nmEmail: string;
    nmContato: string;
    cdLogin: string;
    cdCnpj: string;
    fgSequenciamento: string;
    fgStatus: number;
    qtdSequenciais: number;
    emails: string;

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type transportadoraCadastro = {
    transportadoraId: number;
    nmNomeEmpresa: string;
    nmNomeReduzido: string;
    nmLogradouro: string;
    nmBairro: string;
    nmCep: string;
    nmUf: string;
    nmMunicipio: string;
    nmEmail: string;
    nmContato: string;
    cdLogin: string;
    cdCnpj: string;
    fgSequenciamento: string;
    fgStatus: number;
    qtdSequenciais: number;
    emails: string;
}

export type transportadoraForm = {
    transportadoraId: number;
    nmNomeEmpresa: string;
    nmNomeReduzido: string;
    nmLogradouro: string;
    nmBairro: string;
    nmCep: string;
    nmUf: string;
    nmMunicipio: string;
    nmEmail: string;
    nmContato: string;
    cdLogin: string;
    cdCnpj: string;
    fgSequenciamento: string;
    fgStatus: number;
    qtdSequenciais: number;
    emails: string;
}

export type transportadoraFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type transportadoraFiltroSelect = {
    pesquisa?: string | null;
}