import { areaArmazenagemListagem } from "./areaArmazenagem.d";
import { baseFiltros } from "./baseEntity.d";
import { typeSelectOptions, typeSelectResponse } from "./select.d";

export type agrupadorAtivoListagem = {
    agrupadorId: number;
    tpAgrupamento: number;
    codigo1: string;
    codigo2: string;
    codigo3: string;
    cdSequencia: number;
    dtAgrupador: Date;
    areaArmazenagemId: number;
    areaArmazenagem: areaArmazenagemListagem;
    fgStatus: typeSelectResponse;
};

export type agrupadorAtivoCadastro = {
    agrupadorId: number;
    tpAgrupamento: number;
    codigo1: string;
    codigo2: string;
    codigo3: string;
    cdSequencia: number;
    dtAgrupador: Date;
    areaArmazenagemId: number;
    fgStatus: typeSelectOptions;
}

export type agrupadorAtivoForm = {
    agrupadorId: number;
    tpAgrupamento: number;
    codigo1: string;
    codigo2: string;
    codigo3: string;
    cdSequencia: number;
    dtAgrupador: Date;
    areaArmazenagemId: typeSelectOptions;
    fgStatus: number;
}

export type agrupadorAtivoFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type agrupadorAtivoFiltroSelect = {
    pesquisa?: string | null;
}