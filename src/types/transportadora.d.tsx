import { baseEntity, baseFiltros } from "./baseEntity.d";

export type TransportadoraListagem = {
    id_transportadora: number;
    nm_nomeempresa: string;
    nm_nomereduzido: string;
    nm_logradouro: string;
    nm_bairro: string;
    nm_cep: string;
    nm_uf: string;
    nm_municipio: string;
    nm_email: string;
    nm_contato: string;

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type TransportadoraCadastro = {
    id_transportadora: number;
    nm_nomeempresa: string;
    nm_nomereduzido: string;
    nm_logradouro: string;
    nm_bairro: string;
    nm_cep: string;
    nm_uf: string;
    nm_municipio: string;
    nm_email: string;
    nm_contato: string;
}

export type TransportadoraForm = {
    id_transportadora: number;
    nm_nomeempresa: string;
    nm_nomereduzido: string;
    nm_logradouro: string;
    nm_bairro: string;
    nm_cep: string;
    nm_uf: string;
    nm_municipio: string;
    nm_email: string;
    nm_contato: string;
}

export type TransportadoraFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type TransportadoraFiltroSelect = {
    pesquisa?: string | null;
}