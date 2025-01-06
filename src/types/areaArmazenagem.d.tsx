import { agrupadorAtivoListagem } from "./agrupadorAtivo.d";
import { baseFiltros } from "./baseEntity.d";
import { enderecoListagem } from "./endereco.d";
import { typeSelectOptions } from "./select.d";
import { tipoAreaListagem } from "./tipoArea.d";

export type areaArmazenagemListagem = {
    areaArmazenagemId: number;
    tipoAreaId: number;
    tipoArea: tipoAreaListagem;
    enderecoId: number;
    endereco: enderecoListagem;
    agrupadorId: number;
    agrupador: agrupadorAtivoListagem;
    nrPosicaoX: number;
    nrPosicaoY: number;
    nrLado: number;
    fgStatus: number;
    cdIdentificacao: string;
    agrupadorReservadoId: number;
};

export type areaArmazenagemCadastro = {
    areaArmazenagemId: number;
    tipoAreaId: number;
    enderecoId: number;
    agrupadorId: number;
    nrPosicaoX: number;
    nrPosicaoY: number;
    nrLado: number;
    fgStatus: number;
    cdIdentificacao: string;
    agrupadorReservadoId: number;
}

export type areaArmazenagemForm = {
    areaArmazenagemId: number;
    tipoAreaId: number;
    tipoArea: typeSelectOptions;
    enderecoId: number;
    endereco: typeSelectOptions;
    agrupadorId: number;
    agrupador: typeSelectOptions;
    nrPosicaoX: number;
    nrPosicaoY: number;
    nrLado: number;
    fgStatus: number;
    cdIdentificacao: string;
    agrupadorReservadoId: number;
    agrupadorReservado: typeSelectOptions;
}

export type areaArmazenagemFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type areaArmazenagemFiltroSelect = {
    pesquisa?: string | null;
}

export type corStatusAreaArmazenagem = {
    codigo: number;
    tipo: string;
    cor: string;
    semPallet: boolean;
    pallet: number;
    caracol: number;
    gaiola: number;
    quantidade: number;
    status: statusLuz;
}

export enum statusLuz {
    Desligado = 0,
    LuzVermelha = 1,
    LuzVerde = 2,
}