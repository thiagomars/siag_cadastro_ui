import { baseFiltros } from "./baseEntity.d";
import { depositoListagem } from "./deposito.d";
import { typeSelectOptions } from "./select.d";

export type regiaoTrabalhoListagem = {
    regiaoTrabalhoId: number;
    depositoId: number;
    deposito?: depositoListagem;
    nmRegiaoTrabalho: string;
};

export type regiaoTrabalhoCadastro = {
    regiaoTrabalhoId: number;
    depositoId: number;
    deposito?: typeSelectOptions;
    nmRegiaoTrabalho: string;
}

export type regiaoTrabalhoForm = {
    regiaoTrabalhoId: number;
    depositoId: number | typeSelectOptions;
    nmRegiaoTrabalho: string;
}

export type regiaoTrabalhoFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type regiaoTrabalhoFiltroSelect = {
    pesquisa?: string | null;
}