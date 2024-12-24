import { baseFiltros } from "./baseEntity.d";

export type tipoEnderecoListagem = {
    tipoEnderecoId: number;
    nmTipoEndereco: string;
};

export type tipoEnderecoCadastro = {
    tipoEnderecoId: number;
    nmTipoEndereco: string;
}

export type tipoEnderecoForm = {
    tipoEnderecoId: number;
    nmTipoEndereco: string;
}

export type tipoEnderecoFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type tipoEnderecoFiltroSelect = {
    pesquisa?: string | null;
}