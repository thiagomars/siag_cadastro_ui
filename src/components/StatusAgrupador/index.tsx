import { MouseEventHandler } from "react"
import classNames from "../../utils/classNames"
import { twMerge } from "tailwind-merge";

interface Props {
    value?: number;
    tipo?: string;
    color?: string;
    crossed?: boolean;
    isCard?: boolean;
    handleOnClick?: MouseEventHandler;
    className?: string
}

export default function StatusAgrupador({ value, color, tipo, isCard = false, crossed = false, handleOnClick, className }: Props) {
    return (
        <div className={twMerge(`flex justif items-center gap-4 w-full h-full`, className)}>
            <div className={classNames('flex shadow-sm rounded-md items-center justify-center border',
                isCard ? 'text-2xl size-full' : 'size-9',
                crossed && 'bg-crossed'
            )}
                style={{ backgroundColor: color }}
                onClick={handleOnClick}>
                {value}
            </div>
            {!isCard && <p className="capitalize">{tipo == null ? 'Sem Pallet' : tipo}</p>}
        </div>
    )
}