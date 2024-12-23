import { baseFiltros } from "./baseEntity.d";
import { typeSelectOptions } from "./select.d";

export type palletListagem = {
    id_pallet: number;
    id_areaarmazenagem: number;
    id_agrupador: number;
    fg_status: string;
    qt_utilizacao: number;
    dt_ultimamovimentacao: string;
    cd_identificacao: string;
};

export type palletCadastro = {
    id_pallet: number;
    id_areaarmazenagem: number;
    id_agrupador: number;
    fg_status: string;
    qt_utilizacao: number;
    dt_ultimamovimentacao: string;
    cd_identificacao: string;
}

export type palletForm = {
    id_pallet: number;
    id_areaarmazenagem: number | typeSelectOptions;
    id_agrupador: number | typeSelectOptions;
    fg_status: string;
    qt_utilizacao: number;
}

export type palletFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type palletFiltroSelect = {
    pesquisa?: string | null;
}