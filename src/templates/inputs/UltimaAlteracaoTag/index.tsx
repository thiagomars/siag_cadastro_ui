import { RxPencil1 } from "react-icons/rx";
import Tag from "../../../components/Tag";
import { formatarData } from "../../../utils/data";

type Props = {
    usuarioUltimaAlteracao: string;
    dataUltimaAlteracao: Date | string;
    className?: string
}

export default function TagUltimaAlteracao({ usuarioUltimaAlteracao, dataUltimaAlteracao, className }: Props) {
    return (
        <Tag status="success" className={className}>
            <>
                <RxPencil1
                    className="mr-1 h-5 w-3 text-primary-800"
                    aria-hidden="true"
                />
                {
                    !!usuarioUltimaAlteracao 
                    ? <span>{usuarioUltimaAlteracao} - {formatarData(dataUltimaAlteracao)}</span> 
                    : <span>Nenhuma alteração</span>
                }
            </>
        </Tag>

    )
}
