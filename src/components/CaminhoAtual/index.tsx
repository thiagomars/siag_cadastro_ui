import { BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ItemMenu } from '../../types/menu.d';
import classNames from '../../utils/classNames';
import { Icon } from '../Icon';
import Tag from '../Tag';

type Props = {
    menu: Array<ItemMenu>;
    className?: string;
}

export default function CaminhoAtual({ menu, className }: Props): JSX.Element {
    const Caminho = ({ menu }: { menu: Array<ItemMenu> }) => {
        return (
            <>
                {menu?.filter(item => item.ativo).map(item => (
                    <div key={item.descricao} className='flex flex-row flex-wrap items-center gap-1'>
                        <ParteCaminho item={item} />
                        <Caminho
                            key={"sub" + item.descricao}
                            menu={item.submenus}
                        />
                    </div>
                ))}
            </>
        )
    }

    const ParteCaminho = ({ item }: { item: ItemMenu }) => {
        return (
            <>
                {item.link ?
                    <Link to={item.link} className={classNames(
                        'flex flex-row items-center gap-1 ',
                        'hover:text-primary-700 transition duration-200'
                    )}>
                        <Icon
                            id={item.icone}
                            outline={true}
                            icon={item.icone}
                            className='flex flex-row items-center w-4 h-4'
                        />
                        <span>{item.descricao}</span>
                    </Link>
                    :
                    <Tag status='info' className='flex flex-row items-center gap-1'>
                        <Icon
                            id={item.icone}
                            outline={true}
                            icon={item.icone}
                            className='flex flex-row items-center w-4 h-4'
                        />
                        <span>{item.descricao}</span>
                    </Tag>
                }

                {(item.submenus) &&
                    <BsChevronRight
                        className='flex flex-row items-center w-3 h-3'
                    />
                }
            </>
        )
    }

    return (
        <div className={classNames(
            'flex flex-row flex-wrap items-center gap-1 text-xs text-gray-600 font-semibold px-2',
            className
        )}>
            {menu?.filter(item => item.ativo)[0]?.link != "/" &&
                <>
                    <ParteCaminho item={menu[0]} />
                    <BsChevronRight
                        className='flex flex-row items-center w-3 h-3'
                    />
                </>
            }
            <Caminho menu={menu} />
        </div >
    )
}
