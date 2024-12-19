export type Arquivo = {
    descricao: string;
    nomeArquivo: string;
    extensao: string;
    nomeCompleto: string;
    dropboxLinkView: string;
    dropboxLinkDownload: string;
    dropboxCaminhoArquivo: string;
    tamanho: number;
    ativo: boolean;
    editavel: boolean;
    app: boolean;
    id: number;
    dataCadastro: string | Date;
    usuarioCadastro: string;
    dataEdicao: string | Date;
    usuarioEdicao: string;
}