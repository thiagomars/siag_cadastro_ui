export type baseAlteracoes = {
    dataCadastro: Date,
    usuarioCadastro: string,
    dataEdicao: Date | null;
    usuarioEdicao: string | null;
    dataUltimaAlteracao: Date,
    usuarioUltimaAlteracao: string,
}

export type baseEntity = {
    id: number;
} & baseAlteracoes;

export type modoListagem = 'lista' | 'card';

export type baseFiltros = {
    pageSize?: number;
    currentPage?: number;
    impressao?: boolean;
    modoListagem?: modoListagem;
}