import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Children, MouseEventHandler } from 'react';
import { AiFillCaretRight, AiOutlineMessage } from 'react-icons/ai';
import { BsPersonVcardFill } from 'react-icons/bs';
import { FaClipboardList, FaFileUpload, FaPrint, FaRegCheckCircle, FaSearch, FaUnlockAlt } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { RxArchive, RxCheckCircled, RxCopy, RxCrossCircled, RxCube, RxDotsVertical, RxDownload, RxEyeOpen, RxPencil1, RxPlay, RxReset, RxSymbol, RxTrash } from "react-icons/rx";
import classNames from '../../utils/classNames';

type Props = {
    children: Array<JSX.Element> | JSX.Element;
}

type TiposBotao = "editar" | "excluir" | "visualizar" | "duplicar" | "reabrir" | "concluir" |
    "cancelar" | "download" | "pedido" | "dinheiro" | "caixa" | "recarregar" | "iniciar" |
    "imprimir" | "upload" | "mensagem" | "lista" | "adicionar" | "atender" | "definir-motorista" |
    "finalizar" | "analisar" | "cadeado"

type PropsBotao = {
    tipo?: TiposBotao;
    acaoBotao: MouseEventHandler;
    ativo: boolean;
    texto?: string,
}

export default function MenuDropdown({ children }: Props) {
    let itensAtivos = (Children.toArray(children).filter(item => (item as JSX.Element).props.ativo).length > 0)
    return (
        <div onClick={e => e.stopPropagation()}>
            
            <DropdownMenu.Root>
                <DropdownMenu.Trigger className={classNames('cursor-pointer', !itensAtivos && "pointer-events-none opacity-50 ")}>
                    <RxDotsVertical
                        className="h-5 w-5"
                        aria-hidden="true"
                    />
                </DropdownMenu.Trigger>

                {itensAtivos && 
                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-white shadow-lg p-1 border border-gray-300 rounded-lg gap-1" sideOffset={5}>
                        {children}

                        <DropdownMenu.Arrow fill='white' />
                    </DropdownMenu.Content >
                </DropdownMenu.Portal> }
            </DropdownMenu.Root>
        </div>
    );
};

MenuDropdown.Opcao = (props: PropsBotao) => {
    const {
        tipo,
        acaoBotao,
        ativo = false,
        texto
    } = props;

    return (
        <>
            {ativo ?
                <DropdownMenu.Item>
                    <a
                        onClick={ativo ? acaoBotao : () => { }}
                        className="transition duration-100 text-gray-900 cursor-pointer group flex w-full justify-start rounded-md pr-3 pl-2 py-2 text-sm hover:bg-primary-100 hover:text-black items-center"
                    >
                        {
                            (tipo == "editar") && <RxPencil1 className="h-4 w-4 mr-2 " /> ||
                            (tipo == "excluir") && <RxTrash className="h-4 w-4 mr-2 " /> ||
                            (tipo == "visualizar") && <RxEyeOpen className="h-4 w-4 mr-2 " /> ||
                            (tipo == "duplicar") && <RxCopy className="h-4 w-4 mr-2 " /> ||
                            (tipo == "iniciar") && <RxPlay className="h-4 w-4 mr-2 " /> ||
                            (tipo == "reabrir") && <RxReset className="h-4 w-4 mr-2 " /> ||
                            (tipo == "concluir") && <RxCheckCircled className="h-4 w-4 mr-2 " /> ||
                            (tipo == "cancelar") && <RxCrossCircled className="h-4 w-4 mr-2 " /> ||
                            (tipo == "download") && <RxDownload className="h-4 w-4 mr-2 " /> ||
                            (tipo == "pedido") && <RxArchive className="h-4 w-4 mr-2 " /> ||
                            (tipo == "dinheiro") && <div className="h-4 w-4 mr-2 border border-gray-800 text-center rounded-full flex items-center justify-center">$</div> ||
                            (tipo == "caixa") && <RxCube className="h-4 w-4 mr-2 " /> ||
                            (tipo == "recarregar") && <RxSymbol className="h-4 w-4 mr-2 " /> ||
                            (tipo == "imprimir") && <FaPrint className="h-4 w-4 mr-2 text-gray-500" /> ||
                            (tipo == "mensagem") && <AiOutlineMessage className="h-4 w-4 mr-2" /> ||
                            (tipo == "upload") && <FaFileUpload className="h-4 w-4 mr-2 text-gray-600" /> ||
                            (tipo == "adicionar") && <GrAdd className="h-4 w-4 mr-2 text-gray-600" /> ||
                            (tipo == "analisar") && <FaSearch className="h-4 w-4 mr-2 text-gray-500" /> ||
                            (tipo == "lista") && <FaClipboardList className="h-4 w-4 mr-2 text-gray-600" /> ||
                            (tipo == "finalizar") && <FaRegCheckCircle className="h-4 w-4 mr-2 text-gray-600" /> ||
                            (tipo == "definir-motorista") && <BsPersonVcardFill className="h-4 w-4 mr-2 text-gray-600" /> ||
                            (tipo == "atender") && <AiFillCaretRight className="h-4 w-4 mr-2 text-gray-600" /> ||
                            (tipo == "cadeado") && <FaUnlockAlt className="h-4 w-4 mr-2 text-gray-500" />
                        }
                        <span className='capitalize'>{texto || tipo}</span>
                    </a>
                </DropdownMenu.Item>
                : <></>
            }

        </>

    )
}