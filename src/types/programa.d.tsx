import { baseEntity, baseFiltros } from "./baseEntity.d";

export type ProgramaListagem = {
    programaId: number;
    cdPrograma: number;
    cdDocumento: number;
    cdFabrica : number;
    cdEstabelecimento: number;
    cdEquipamento: string,
    dtLiberacao: Date,
    fgTipo: number,
    cdDeposito: string,
    qtAlturaCaixa: number,
    qtLarguraCaixa: number,
    qtComprimentoCaixa: number

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type ProgramaCadastro = {
    programaId: number;
    cdPrograma: number;
    cdDocumento: number;
    cdFabrica : number;
    cdEstabelecimento: number;
    cdEquipamento: string,
    dtLiberacao: Date,
    fgTipo: number,
    cdDeposito: string,
    qtAlturaCaixa: number,
    qtLarguraCaixa: number,
    qtComprimentoCaixa: number
}

export type ProgramaForm = {
    programaId: number;
    cdPrograma: number;
    cdDocumento: number;
    cdFabrica : number;
    cdEstabelecimento: number;
    cdEquipamento: string,
    dtLiberacao: Date,
    fgTipo: number,
    cdDeposito: string,
    qtAlturaCaixa: number,
    qtLarguraCaixa: number,
    qtComprimentoCaixa: number
}

export type ProgramaFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type ProgramaFiltroSelect = {
    pesquisa?: string | null;
}