import { baseEntity, baseFiltros } from "./baseEntity.d";

export type TurnoListagem = {
    turnoId: number;
    cdTurno: string;
    dtInicio: Date;
    dt_fim: Date;
    diaAnterior: boolean;
    diaSucessor: boolean;

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type TurnoCadastro = {
    turnoId: number;
    cdTurno: string;
    dtInicio: Date;
    dt_fim: Date;
    diaAnterior: boolean;
    diaSucessor: boolean;
}

export type TurnoForm = {
    turnoId: number;
    cdTurno: string;
    dtInicio: Date;
    dt_fim: Date;
    diaAnterior: boolean;
    diaSucessor: boolean;
}

export type TurnoFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type TurnoFiltroSelect = {
    pesquisa?: string | null;
}