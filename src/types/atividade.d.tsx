import { baseFiltros } from "./baseEntity.d";
import { typeSelectOptions } from "./select.d";
import { setorTrabalhoListagem } from "./setorTrabalho.d";

export type atividadeListagem = {
    atividadeId: number;
    nmAtividade: string;
    equipamentoModeloId: number;
    // equipamentoModelo: equipamento
    setorTrabalhoId: number;
    setorTrabalho: setorTrabalhoListagem;
    fgPermiteRejeitar: number;
    atividadeAnteriorId: number;
    atividadeAnterior: atividadeListagem;
    fgTipoAtribuicaoAutomatica: number;
    atividadeRotinaValidacaoId: number;
    atividadeRotinaValidacao: atividadeListagem;
    fgEvitaConflitoEndereco: number;
    duracao: Date | string;
};

export type atividadeCadastro = {
    atividadeId: number;
    nmAtividade: string;
    equipamentoModeloId: number;
    setorTrabalhoId: number;
    fgPermiteRejeitar: number;
    atividadeAnteriorId: number;
    fgTipoAtribuicaoAutomatica: number;
    atividadeRotinaValidacaoId: number;
    fgEvitaConflitoEndereco: number;
    duracao: Date | string;
}

export type atividadeForm = {
    atividadeId: number;
    nmAtividade: string;
    equipamentoModeloId: number;
    equipamentoModelo: typeSelectOptions;
    setorTrabalhoId: number;
    setorTrabalho: typeSelectOptions;
    fgPermiteRejeitar: number;
    atividadeAnteriorId: number;
    atividadeAnterior: typeSelectOptions;
    fgTipoAtribuicaoAutomatica: number;
    atividadeRotinaValidacaoId: number;
    atividadeRotinaValidacao: typeSelectOptions;
    fgEvitaConflitoEndereco: number;
    duracao: Date | string;
}

export type atividadeFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type atividadeFiltroSelect = {
    pesquisa?: string | null;
}