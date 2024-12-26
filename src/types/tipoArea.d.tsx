import { baseFiltros } from "./baseEntity.d";

export type tipoAreaListagem = {
    tipoAreaId: number;
    nmTipoArea: string;
};

export type tipoAreaCadastro = {
    tipoAreaId: number;
    nmTipoArea: string;
}

export type tipoAreaForm = {
    tipoAreaId: number;
    nmTipoArea: string;
}

export type tipoAreaFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type tipoAreaFiltroSelect = {
    pesquisa?: string | null;
}