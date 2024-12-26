import { MouseEventHandler } from "react"
import classNames from "../../utils/classNames"

interface Props {
    value?: number,
    percent?: number
    type?: 'livre' | 'reservado' | 'ocupado' | 'manutencao' | 'desabilitado' | 'bloqueado'
    isCard?: boolean
    handleOnClick?: MouseEventHandler
}

export default function StatusAgrupador({ value, percent = 0, isCard = false, type, handleOnClick }: Props) {
    const label = type == null ? 'Sem Pallet' : `${percent}% ${type}`
    return (
        <div className="flex justif items-center gap-4 w-full h-full">
            <div className={classNames('flex shadow-sm rounded-md items-center justify-center border',
                isCard ? 'text-2xl size-full' : 'size-9',
                type == null && 'bg-empty',
                type == 'livre' && 'bg-white',
                type == 'reservado' && 'bg-[#FCF804]',
                type == 'ocupado' && 'bg-[#08a00b]',
                type == 'manutencao' && 'bg-[#FB0101]',
                type == 'desabilitado' && 'bg-[#999]',
                type == 'bloqueado' && 'bg-slate-500 text-white',
            )}
                onClick={handleOnClick}>
                {value}
            </div>
            {!isCard && <p className="capitalize">{label}</p>}
        </div>
    )
}