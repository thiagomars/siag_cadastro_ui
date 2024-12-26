import { postRequest } from "../utils/axiosRequest";

type arquivoUpload = {
    File: string | Blob;
    Id: number;
    Descricao: string;
}

export const postUploadArquivo = async (arquivo: arquivoUpload | FormData) => {
    return await postRequest(`/arquivo`, arquivo);
}

export const postUploadArquivoAnonymous = async (arquivo: arquivoUpload | FormData) => {
    return await postRequest(`/arquivo`, arquivo);
}