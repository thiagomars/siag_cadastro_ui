import { useEffect, useState } from "react";
// import { getItensMenu } from "../../services/menu";
import { ItemMenu, ItemMenuGrupo } from "../../types/menu.d";
import classNames from '../../utils/classNames';
import { Icon } from "../Icon";

export const IconeAtual = ({ className, icone = null }: {className: string, icone?: JSX.Element | null}) => {
    const [menu, setMenu] = useState<Array<ItemMenuGrupo>>([])

    // useEffect(() => {
    //     carregarItensMenu()
    // }, [])

    // async function carregarItensMenu(): Promise<void> {
    //     let caminho = location.pathname.split("/")[1]

    //     if (caminho == "conta")
    //         caminho = caminho + "-" + location.pathname.split("/")[2];

    //     const menuAtual = caminho;
    //     const response = await getItensMenu(menuAtual)

    //     if (response.sucesso) {
    //         setMenu(response.dados.menu)
    //     }
    // }


    const Icone = ({ menu }: { menu: Array<ItemMenu> }) => {
        return (
            <>
                {icone || (
                    menu?.filter(item => item.ativo).map(item => (
                        <div key={item.descricao}>
                            {item.submenus ?
                                <Icone
                                    key={"sub" + item.descricao}
                                    menu={item.submenus}
                                />
                                :
                                <Icon
                                    id={item.icone}
                                    outline={true}
                                    icon={item.icone}
                                    className={classNames(className, "items-center")}
                                />
                            }
                        </div>
                    ))
                )}
            </>
        )
    }

    return (
        <Icone menu={menu[0]?.menus} />
    )
}