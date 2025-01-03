import { baseEntity, baseFiltros } from "./baseEntity.d";

export type parametroListagem = {
    id_parametro: number;
    nm_parametro: string;
    nm_valor: string;

    dataUltimaAlteracao: Date;
    usuarioUltimaAlteracao: string;
} & baseEntity;

export type parametroCadastro = {
    id_parametro: number;
    nm_parametro: string;
    nm_valor: string;
    fg_tipoparametro: number;
    nm_tipo: string;
    nm_unidademedida: string;
    fg_visivel: boolean;
    fg_ativo: number;
}

export type parametroForm = {
    id_parametro: number;
    nm_parametro: string;
    nm_valor: string;
    fg_tipoparametro: number;
    nm_tipo: string;
    nm_unidademedida: string;
    fg_visivel: boolean;
    fg_ativo: number;
}

export type parametroFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type parametroFiltroSelect = {
    pesquisa?: string | null;
}