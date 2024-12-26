import { baseFiltros } from "./baseEntity.d";
import { regiaoTrabalhoListagem } from "./regiaoTrabalho.d";
import { typeSelectOptions } from "./select.d";
import { setorTrabalhoListagem } from "./setorTrabalho.d";
import { tipoEnderecoListagem } from "./tipoEndereco.d";

export type enderecoListagem = {
    enderecoId: number;
    regiaoTrabalhoId: number;
    regiaoTrabalho: regiaoTrabalhoListagem;
    setorTrabalhoId: number;
    setorTrabalho: setorTrabalhoListagem;
    tipoEnderecoId: number;
    tipoEndereco: tipoEnderecoListagem;
    nmEndereco: string;
    qtEstoqueMinimo: number;
    qtEstoqueMaximo: number;
    fgStatus: number;
    tpPreenchimento: number;
};

export type enderecoCadastro = {
    enderecoId: number;
    regiaoTrabalhoId: number;
    setorTrabalhoId: number;
    tipoEnderecoId: number;
    nmEndereco: string;
    qtEstoqueMinimo: number;
    qtEstqueMaximo: number;
    fgStatus: number;
    tpPreenchimento: number;
}

export type enderecoForm = {
    enderecoId: number;
    regiaoTrabalhoId: number;
    regiaoTrabalho: typeSelectOptions;
    setorTrabalhoId: number;
    setorTrabalho: typeSelectOptions;
    tipoEnderecoId: number;
    tipoEndereco: typeSelectOptions;
    nmEndereco: string;
    qtEstoqueMinimo: number;
    qtEstqueMaximo: number;
    fgStatus: number;
    tpPreenchimento: number;
}

export type enderecoFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type enderecoFiltroSelect = {
    pesquisa?: string | null;
}