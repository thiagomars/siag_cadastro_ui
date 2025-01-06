import { LuzFiltro } from "../types/luzes.d";
import { getRequest, postRequest } from "../utils/axiosRequest";

export const sincronizarLuzes = async () => {
    return await getRequest("sincronizar");
};

export const ligarLuzVerde = async (filtro: LuzFiltro) => {
    return await postRequest("luzVerde/ligar", filtro);
};

export const ligarLuzVermelha = async (filtro: LuzFiltro) => {
    return await postRequest("luzVermelha/ligar", filtro);
};

export const desligarLuzVermelha = async (filtro: LuzFiltro) => {
    return await postRequest("luzVermelha/desligar", filtro);
};

export const ligarLuzesVermelhas = async () => {
    return await getRequest("luzVermelha/ligar");
};

export const desligarLuzesVermelhas = async () => {
    return await getRequest("luzVermelha/desligar");
};

export const desligarLuzesVerdes = async () => {
    return await getRequest("luzVerde/desligar");
};
