import { baseEntity, baseFiltros } from "./baseEntity.d";
import { typeSelectOptions } from "./select.d";

export type ufListagem = {
    id: number;
    
    descricao: string;
    ativo: boolean;
    sigla: string;
    codigoIbge: number;

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type ufCadastro = {
    id: number;
    
    descricao: string;
    ativo: boolean;
    sigla: string;
    codigoIbge: number;
}

export type ufForm = {
    id: number;
    
    descricao: string;
    ativo: boolean;
    sigla: string;
    codigoIbge: number;
}

export type ufFiltrosListagem = {
    pesquisa?: string;
    ativo?: typeSelectOptions;
} & baseFiltros;

export type ufFiltroSelect = {
    pesquisa?: string | null;
}