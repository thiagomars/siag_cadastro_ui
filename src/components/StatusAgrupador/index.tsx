import { MouseEventHandler } from "react"
import classNames from "../../utils/classNames"

interface Props {
    value?: number;
    percent?: number;
    tipo?: string;
    color?: string;
    crossed?: boolean;
    isCard?: boolean;
    handleOnClick?: MouseEventHandler;
}

export default function StatusAgrupador({ value, color, tipo, percent = 0, isCard = false, crossed = false, handleOnClick }: Props) {
    return (
        <div className="flex justif items-center gap-4 w-full h-full">
            <div className={classNames('flex shadow-sm rounded-md items-center justify-center border',
                isCard ? 'text-2xl size-full' : 'size-9',
                crossed && 'bg-crossed'
            )}
                style={{ backgroundColor: color }}
                onClick={handleOnClick}>
                {value}
            </div>
            {!isCard && <p className="capitalize">{tipo == null ? 'Sem Pallet' : `${percent}% ${tipo}`}</p>}
        </div>
    )
}