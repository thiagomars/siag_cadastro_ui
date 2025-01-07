import { LuzFiltro } from "../types/luzes.d";
import { getRequest, postRequest } from "../utils/axiosRequest";

export const sincronizarLuzes = async () => {
    return await getRequest("/Luzes/sincronizar");
};

export const ligarLuzVerde = async (filtro: LuzFiltro) => {
    return await postRequest("/Luzes/luzVerde/ligar", filtro);
};

export const ligarLuzVermelha = async (filtro: LuzFiltro) => {
    return await postRequest("/Luzes/luzVermelha/ligar", filtro);
};

export const desligarLuzVermelha = async (filtro: LuzFiltro) => {
    return await postRequest("/Luzes/luzVermelha/desligar", filtro);
};

export const ligarLuzesVermelhas = async () => {
    return await getRequest("/Luzes/luzVermelha/ligar");
};

export const desligarLuzesVermelhas = async () => {
    return await getRequest("/Luzes/luzVermelha/desligar");
};

export const desligarLuzesVerdes = async () => {
    return await getRequest("/Luzes/luzVerde/desligar");
};
