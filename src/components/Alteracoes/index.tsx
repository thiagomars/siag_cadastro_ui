import classNames from "../../utils/classNames";
import { formatarData } from "../../utils/data";

type Props = {
    usuarioCadastro?: string,
    dataCadastro?: Date,
    usuarioUltimaAlteracao?: string | null,
    dataUltimaAlteracao?: Date | null,
    className?: React.HTMLAttributes<HTMLDivElement>["className"],
    isModal?: boolean
}

export default function Alteracoes(props: Props): JSX.Element {
    const {
        usuarioCadastro,
        dataCadastro,
        usuarioUltimaAlteracao,
        dataUltimaAlteracao,
        className,
        isModal
    } = props;

    function montaTag(usuario: string | null, data: Date | null): JSX.Element {
        return (
            <p className="flex flex-col gap-1">
                <span>{usuario}</span>
                <span>{formatarData(data || "")}</span>
            </p>
        );
    }

    function Cadastro(): JSX.Element {
        return (
            <div className="text-sm text-gray-600">
                <span className="text-xs text-gray-400">Cadastro</span>
                {montaTag(usuarioCadastro || null, dataCadastro || null)}
            </div>
        )
    }

    function UltimaAlteracao(): JSX.Element {
        return (
            <div className="text-sm text-gray-600">
                <span className="text-xs text-gray-400">Última alteração</span>
                {dataUltimaAlteracao && usuarioUltimaAlteracao
                    ? montaTag(usuarioUltimaAlteracao, dataUltimaAlteracao)
                    : <p>Sem alterações</p>
                }
            </div>
        )
    }
    
    return (
        <div className={classNames(
            "flex-1 flex flex-col gap-2",
            !isModal && "sm:flex-row sm:items-center",
            className
        )}>
            {usuarioCadastro && <Cadastro />}
            {usuarioCadastro && <UltimaAlteracao />}
        </div>
    )
}
