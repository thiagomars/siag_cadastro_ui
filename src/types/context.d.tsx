export interface paginacaoContext {
    funcaoCarregamento: Function;
    paginaAtual: number;
    totalPaginas: number;
    setPaginaAtual: any;
    registrosPorPagina: number;
    loadingListagem: boolean;
    totalRegistros: number;
}
export interface tabelaContext{
    lista: Array<any>;
    funcaoPost : Function;
    funcaoVerificarImpressao: Function;
    funcaoCarregarFiltro : Function;
    funcaoEditar : Function;
    funcaoExcluir : Function;
    itemAcesso: Array<any> ;
    titulo : string;
    listaLinhas: Array<string>
}

export interface FiltrosContext {
    register : any;
    control : any; 
}