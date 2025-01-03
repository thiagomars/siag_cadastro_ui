import { baseEntity, baseFiltros } from "./baseEntity.d";

export type TransportadoraListagem = {
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

export type TransportadoraCadastro = {
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

export type TransportadoraForm = {
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

export type TransportadoraFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type TransportadoraFiltroSelect = {
    pesquisa?: string | null;
}