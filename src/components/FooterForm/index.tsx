import classNames from "../../utils/classNames";
import Alteracoes from "../Alteracoes";
import Box from "../Box";

type Props = {
    usuarioCadastro?: string;
    dataCadastro?: Date;
    usuarioUltimaAlteracao?: string | null;
    dataUltimaAlteracao?: Date | null;
    children?: JSX.Element | Array<JSX.Element>;
    className?: string;
    isModal?: boolean;
}

export default function FooterForm(props: Props): JSX.Element {
    const {
        usuarioCadastro,
        dataCadastro,
        usuarioUltimaAlteracao,
        dataUltimaAlteracao,
        children,
        className,
        isModal
    } = props;

    return (
        <Box className={classNames(className, isModal && "pb-0")}>
            <div className={classNames(
                "flex flex-row gap-4 sm:gap-8 flex-wrap",
                isModal && "flex-col"
            )}>
                {!isModal && <Alteracoes
                    usuarioCadastro={usuarioCadastro}
                    dataCadastro={dataCadastro}
                    usuarioUltimaAlteracao={usuarioUltimaAlteracao}
                    dataUltimaAlteracao={dataUltimaAlteracao}
                    isModal={isModal}
                />}

                <div className={classNames(
                    "grid grid-flow-col-dense auto-cols-fr gap-4 lg:grid-cols-none lg:grid-flow-col",
                    "text-sm text-gray-600 items-center",
                    isModal && "pt-4",
                )}>
                    {children}
                </div>
            </div>
        </Box >
    )
}
