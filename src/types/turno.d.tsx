import { baseEntity, baseFiltros } from "./baseEntity.d";

export type TurnoListagem = {
    id_turno: number;
    cd_turno: string;
    dt_inicio: Date;
    dt_fim: Date;
    diaanterior: boolean;
    diasucessor: boolean;

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type TurnoCadastro = {
    id_turno: number;
    cd_turno: string;
    dt_inicio: Date;
    dt_fim: Date;
    diaanterior: boolean;
    diasucessor: boolean;
}

export type TurnoForm = {
    id_turno: number;
    cd_turno: string;
    dt_inicio: Date;
    dt_fim: Date;
}

export type TurnoFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type TurnoFiltroSelect = {
    pesquisa?: string | null;
}