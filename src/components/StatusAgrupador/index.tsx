import { MouseEventHandler, useState } from "react";
import classNames from "../../utils/classNames";
import { twMerge } from "tailwind-merge";
import Botao from "../Button";
import { desligarLuzVermelha, ligarLuzVerde, ligarLuzVermelha } from "../../services/luzes";
import useToastLoading from "../../hooks/useToastLoading";

interface Props {
    gaiola?: number;
    caracol?: number;
    tipo?: string;
    color?: string;
    crossed?: boolean;
    isCard?: boolean;
    statusVerde?: boolean;
    statusVermelho?: boolean;
    handleOnClick?: MouseEventHandler;
    className?: string
}

export default function StatusAgrupador({ gaiola, caracol, color, tipo, isCard = false, crossed = false, statusVerde, statusVermelho, handleOnClick, className }: Props) {
    const toast = useToastLoading();
    const [statusVerdeGaiola, setStatusVerdeGaiola] = useState<boolean | undefined>(statusVerde);
    const [statusVermelhoGaiola, setStatusVermelhoGaiola] = useState<boolean | undefined>(statusVermelho);

    async function handleLigarLuzVerde() {
        if (caracol == null || gaiola == null) {
            return;
        }

        const response = await ligarLuzVerde({ caracol, gaiola })

        if (response.sucesso) {
            setStatusVerdeGaiola(true);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }
    }

    async function handleLuzVermelha() {
        if (caracol == null || gaiola == null) {
            return;
        }

        if (statusVermelhoGaiola) {
            const response = await desligarLuzVermelha({ caracol, gaiola })

            if (response.sucesso) {
                setStatusVermelhoGaiola(false);
            } else {
                toast({ tipo: response.tipo, mensagem: response.mensagem });
            }
        } else {
            const response = await ligarLuzVermelha({ caracol, gaiola })

            if (response.sucesso) {
                setStatusVermelhoGaiola(true);
            } else {
                toast({ tipo: response.tipo, mensagem: response.mensagem });
            }
        }
    }

    return (
        <div className={twMerge(`flex gap-4 w-full h-full relative ${!isCard && 'items-center'}`, className)}>
            {isCard &&
                <div className="absolute right-0 t-0 flex flex-row p-2 gap-2">
                    <div
                        className={classNames(
                            'size-2 rounded-full',
                            statusVerdeGaiola ? 'bg-green-500' : 'bg-green-800',
                        )}>
                    </div>
                    <div
                        className={classNames(
                            'size-2 rounded-full',
                            statusVermelhoGaiola ? 'bg-red-600' : 'bg-red-800'
                        )}>
                    </div>
                </div>
            }
            <div className={`shadow-sm rounded-md border ${isCard && 'w-full h-full grid grid-rows-[1fr_auto]'}`}>
                <div className={classNames('flex items-center justify-center',
                    isCard ? 'text-2xl' : 'size-9',
                    crossed && 'bg-crossed'
                )}
                    style={{ backgroundColor: color }}
                    onClick={handleOnClick}>
                    {gaiola}
                </div>
                {isCard &&
                    <div className="flex p-2 gap-2 flex-col">
                        <Botao
                            texto={`${statusVermelhoGaiola ? 'Liberar' : 'Cheio'}`}
                            tipo={statusVermelhoGaiola ? 'erro' : 'inativo'}
                            className="w-full h-12"
                            onClick={handleLuzVermelha} />
                        <Botao
                            texto='Ligar'
                            tipo={statusVerdeGaiola ? 'salvar' : 'inativo'}
                            className="w-full h-12"
                            onClick={handleLigarLuzVerde} />
                    </div>
                }
            </div>
            {!isCard && <p className="capitalize">{tipo == null ? 'Sem Pallet' : tipo}</p>}
        </div >
    )
}