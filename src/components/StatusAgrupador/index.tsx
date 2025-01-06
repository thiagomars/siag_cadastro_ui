import { MouseEventHandler, useState } from "react"
import classNames from "../../utils/classNames"
import { twMerge } from "tailwind-merge";
import Botao from "../Button";
import { statusLuz } from "../../types/areaArmazenagem.d";
import { desligarLuzVermelha, ligarLuzVerde, ligarLuzVermelha } from "../../services/luzes";
import useToastLoading from "../../hooks/useToastLoading";

interface Props {
    gaiola?: number;
    caracol?: number;
    tipo?: string;
    color?: string;
    crossed?: boolean;
    isCard?: boolean;
    status?: statusLuz;
    handleOnClick?: MouseEventHandler;
    className?: string
}

export default function StatusAgrupador({ gaiola, caracol, color, tipo, isCard = false, crossed = false, status, handleOnClick, className }: Props) {
    const toast = useToastLoading();
    const [statusAgrupador, setStatusAgrupador] = useState<statusLuz | undefined>(status)

    async function handleLigarLuzVerde() {
        if (caracol == null || gaiola == null) {
            return;
        }

        const response = await ligarLuzVerde({ caracol, gaiola })
        if (response.sucesso) {
            setStatusAgrupador(statusLuz.LuzVerde);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }
    }

    async function handleLuzVermelha() {
        if (caracol == null || gaiola == null) {
            return;
        }

        if (statusAgrupador == statusLuz.Desligado) {
            const response = await ligarLuzVermelha({ caracol, gaiola })

            if (response.sucesso) {
                setStatusAgrupador(statusLuz.LuzVermelha);
            } else {
                toast({ tipo: response.tipo, mensagem: response.mensagem });
            }

            setStatusAgrupador(statusLuz.LuzVermelha);
        } else {
            const response = await desligarLuzVermelha({ caracol, gaiola })

            if (response.sucesso) {
                setStatusAgrupador(statusLuz.Desligado);
            } else {
                toast({ tipo: response.tipo, mensagem: response.mensagem });
            }

            setStatusAgrupador(statusLuz.Desligado);
        }
    }

    return (
        <div className={twMerge(`flex gap-4 w-full h-full relative justify-center ${!isCard && 'items-center'}`, className)}>
            {isCard &&
                <div
                    className={classNames(
                        'size-4 m-2 rounded-full absolute right-0 t-0',
                        statusAgrupador == statusLuz.Desligado && 'bg-neutral-400',
                        statusAgrupador == statusLuz.LuzVermelha && 'bg-red-600',
                        statusAgrupador == statusLuz.LuzVerde && 'bg-green-600',
                    )}>

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
                {isCard && statusAgrupador != statusLuz.LuzVerde &&
                    <div className="flex p-2 gap-2">
                        <Botao
                            texto={`${statusAgrupador == statusLuz.LuzVermelha ? 'Desligar' : 'Ligar'}`}
                            tipo={statusAgrupador == statusLuz.LuzVermelha ? 'erro' : 'inativo'}
                            className="w-full h-12"
                            onClick={handleLuzVermelha} />
                        {statusAgrupador == statusLuz.LuzVermelha && <Botao
                            texto='Ligar'
                            tipo='salvar'
                            className="w-full h-12"
                            onClick={handleLigarLuzVerde} />}
                    </div>
                }
            </div>
            {!isCard && <p className="capitalize">{tipo == null ? 'Sem Pallet' : tipo}</p>}
        </div >
    )
}