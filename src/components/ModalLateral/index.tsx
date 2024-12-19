import * as Dialog from '@radix-ui/react-dialog';
import { RxCross2 } from "react-icons/rx";
import classNames from '../../utils/classNames';
import Alteracoes from '../Alteracoes';
import Botao from '../Button';
import FooterForm from "../FooterForm";
import { IconeAtual } from '../IconeAtual';
import ScrollArea from "../ScrollArea";

type Props = {
    title: string;
    subtitle: string;
    onClose: (open: boolean) => void;
    onSave?: Function;
    open: boolean;
    saving: boolean;
    children: JSX.Element;
    id: number | null;
    usuarioCadastro: string | null;
    dataCadastro: Date | null;
    usuarioUltimaAlteracao: string | null;
    dataUltimaAlteracao: Date | null;
    buttonDefault?: boolean;
    Botoes?: JSX.Element | Array<JSX.Element>;
}

export default function ModalLateral(props: Props): JSX.Element {
    const {
        title,
        subtitle,
        onClose,
        onSave = () => { },
        open,
        saving,
        children,
        id,
        usuarioCadastro,
        dataCadastro,
        usuarioUltimaAlteracao,
        dataUltimaAlteracao,
        buttonDefault = true,
        Botoes
    } = props;

    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay onClick={() => onClose(false)} className="backdrop-blur-sm data-[state=open]:animate-overlayShow bg-gray-800/50 fixed inset-0 " />
                <Dialog.Content className={classNames(
                    "fixed flex flex-col z-40 max-w-md",
                    "top-2 bottom-2 right-2 ml-2",
                    "bg-white rounded-md overflow-hidden shadow-lg",
                    "focus:outline-none",
                    "divide-y-2 gap-4 py-4"
                )}>

                    <Dialog.Title asChild>
                        <div className="flex flex-row justify-between items-start gap-4 px-4">
                            <div className="flex flex-col gap-2">
                                <div className='flex flex-row items-center gap-2'>
                                    <IconeAtual className="w-6 h-6 text-primary-800 " />
                                    <h1 className='text-2xl font-semibold text-primary-900'>{title} {id ? ("#" + id) : ""}</h1>
                                </div>
                                <p className='text-sm font-semibold'>{subtitle}</p>
                            </div>
                            <Botao
                                id="botaoFechar"
                                onClick={() => onClose(false)}
                                className='p-1 mt-1 bg-transparent shadow-none border-none'
                                icone={<RxCross2 className="h-6 w-6" aria-hidden="true" />}
                            />
                        </div>
                    </Dialog.Title >

                    <Dialog.Description asChild className="overflow-y-hidden py-4">
                        <ScrollArea>
                            <div className="flex flex-col gap-8 px-1">
                                {children}
                                <Alteracoes
                                    usuarioCadastro={usuarioCadastro || ""}
                                    dataCadastro={dataCadastro || new Date()}
                                    usuarioUltimaAlteracao={usuarioUltimaAlteracao || null}
                                    dataUltimaAlteracao={dataUltimaAlteracao || null}
                                    isModal
                                />
                            </div>
                        </ScrollArea>
                    </Dialog.Description>

                    {buttonDefault ? <FooterForm
                        className="shadow-none pt-0 -z-50"
                        isModal={true}
                    >
                        <Botao
                            id="botaoSalvar"
                            onClick={() => onSave()}
                            carregando={saving}
                            texto={"Salvar"}
                            tipo={"sucesso"}
                            className={"relative inline-flex items-center border border-transparent shadow-sm text-sm font-medium rounded-md"}
                        />
                    </FooterForm>
                        : <div className='rounded-t-md px-4 pt-4 w-full flex flex-row flex-wrap gap-4 flex-1'>
                            {Botoes}
                        </div>}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    );
}

// const FooterFormModal = ({ children }): JSX.Element => {

//     return (
//         <FooterForm
//             className="shadow-none bottom-0  pt-0 -z-50 "
//             isModal={true}
//         >
//             { children }
//         </FooterForm>
//     )
// }

// ModalLateral.FooterForm = FooterFormModal;