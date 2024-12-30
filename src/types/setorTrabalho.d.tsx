import { baseFiltros } from "./baseEntity.d";
import { depositoListagem } from "./deposito.d";
import { typeSelectOptions } from "./select.d";

export type setorTrabalhoListagem = {
    setorTrabalhoId: number;
    depositoId: number;
    deposito?: depositoListagem;
    nmSetorTrabalho: string;
};

export type setorTrabalhoCadastro = {
    setorTrabalhoId: number;
    depositoId: number;
    deposito?: typeSelectOptions;
    nmSetorTrabalho: string;
}

export type setorTrabalhoForm = {
    setorTrabalhoId: number;
    depositoId: number | typeSelectOptions;
    nmSetorTrabalho: string;
}

export type setorTrabalhoFiltrosListagem = {
    pesquisa?: string;
} & baseFiltros;

export type setorTrabalhoFiltroSelect = {
    pesquisa?: string | null;
}

export type SetorSelect = {
    setorId: number,
    setor: string
}