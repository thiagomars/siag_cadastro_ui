import { baseFiltros } from "./baseEntity.d";
import { typeSelectOptions } from "./select.d";

export type areaArmazenagemListagem = {
    id_areaarmazenagem: number;
    id_tipoarea: number;
    id_endereco: number;
    id_agrupador: number;
    nr_posicaox: number;
    nr_posicaoy: number;
    nr_lado: number;
    fg_status: number;
    cd_identificacao: string;
    id_agrupador_reservado: number;
};

export type areaArmazenagemCadastro = {
    id_areaarmazenagem: number;
    id_tipoarea: number;
    id_endereco: number;
    id_agrupador: number;
    nr_posicaox: number;
    nr_posicaoy: number;
    nr_lado: number;
    fg_status: number;
    cd_identificacao: string;
    id_agrupador_reservado: number;
}

export type areaArmazenagemForm = {
    id_areaarmazenagem: number;
    id_tipoarea: number | typeSelectOptions;
    id_endereco: number | typeSelectOptions;
    id_agrupador: number | typeSelectOptions;
    nr_posicaox: number;
    nr_posicaoy: number;
    nr_lado: number;
    fg_status: number;
    cd_identificacao: string;
    id_agrupador_reservado: number | typeSelectOptions;
}

export type areaArmazenagemFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type areaArmazenagemFiltroSelect = {
    pesquisa?: string | null;
}