import * as Collapsible from '@radix-ui/react-collapsible';
import { RxChevronDown } from 'react-icons/rx';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { ItemMenu } from '../../../types/menu.d';
import classNames from '../../../utils/classNames';

export default function MenuItem({ props }: { props: ItemMenu }) {
    const Submenu = ({ item }: { item: ItemMenu }) => (
        <Collapsible.Root defaultOpen={item.ativo} className='flex flex-col flex-1 gap-1'>
            <Collapsible.Trigger className={classNames(
                'group flex items-center justify-center gap-2 px-2 py-2 text-base font-medium rounded-md w-full',
                item.ativo ? 'text-white ' : ' text-gray-200/40  hover:text-white',
            )}>

                <Icone icone={item.icone} ativo={item.ativo} />
                <Descricao descricao={item.descricao} />
                {item.submenus && <RxChevronDown className={classNames("transition duration-200", "group-data-[state='open']:-rotate-180")} />}

            </Collapsible.Trigger>
            <Collapsible.Content className={classNames(
                'ml-5 pl-2 flex border-l border-dashed border-white/20 flex-col gap-1',
            )}>
                {item.submenus?.map((submenu, index) => <MenuItem key={submenu.descricao + index} props={submenu} />)}
            </Collapsible.Content>
        </Collapsible.Root>
    )

    const Link = ({ item }: { item: ItemMenu }) => {
        return (
            (
                <RouterLink to={item.link} className={classNames(
                    'group flex items-center justify-center gap-2 px-2 py-2 text-base font-medium rounded-md w-full mb-1',
                    item.ativo ? 'text-white' : ' text-gray-200/40  hover:text-white',
                    !item.possuiAcesso && 'pointer-events-none'
                )}>
                    <Icone icone={item.icone} ativo={item.ativo} />
                    <div className='flex-1 flex flex-row justify-between items-center'>
                        <Descricao descricao={item.descricao} />
                        {!item.possuiAcesso && <Icone icone="FaLock" ativo={item.ativo} />}
                    </div>
                </RouterLink>
            )
        )
    }


    const Descricao = ({ descricao }: { descricao: string }) => {
        return <span className='flex-1 text-left'>{descricao}</span>
    }

    const Icone = ({ icone, ativo }: { icone: string, ativo: boolean }) => {
        return (
            <div className='flex flex-col items-center'>
                <Icon
                    icon={icone}
                    outline={!ativo}
                    className={classNames(
                        ativo ? 'text-white' : 'text-gray-200/40 group-hover:text-white',
                        'flex-shrink-0 h-4 w-4'
                    )}
                />
            </div>
        )
    }

    return (
        <div >
            {props.submenus ? <Submenu item={props} /> : <Link item={props} />}
        </div>
    )
}