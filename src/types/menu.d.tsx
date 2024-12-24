export type ItemMenuGeral = {
    collapsedMenu: boolean;
    menu: Array<ItemMenuGrupo>;
    menuPesquisa: Array<ItemMenuGrupo>;
}

export type ItemMenuGrupo = {
    descricao: string;
    menus: Array<ItemMenu>;
}

export type ItemMenu = {
    descricao: string;
    link: string;
    icone: string;
    ativo: boolean;
    idAlerta: string;
    caminho: string;
    submenus: Array<ItemMenu> | null;
    possuiAcesso: boolean;
}