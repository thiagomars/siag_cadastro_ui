import Tooltip from '../../components/Tooltip';
import classNames from '../../utils/classNames';

type PropsConteudo = {
    alt?: string;
    link?: string;
    defaultImageLink?: string;
    defaultErrorImageLink?: string;
    className?: string;
}

type Tamanhos = "pequena" | "media" | "grande" | "expansiva";

type PropsImagemPerfil = {
    tamanho: Tamanhos;
}

type PropsImagemPadrao = {
    tamanho: Tamanhos;
}

const Imagem = ({ children }) => {
    return (
        <div className="h-fit overflow-hidden">
            {children}
        </div>
    )
}

const Conteudo = (props: PropsConteudo) => {
    const {
        alt,
        link,
        defaultImageLink = "imagens/picture.png",
        className
    } = props;

    return (
        <Tooltip>
            <>
                <Tooltip.Trigger className="">
                    <img
                        className={classNames("w-full h-full object-contain", className)}
                        src={link || defaultImageLink}
                        alt={alt}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            let linkCorrigido = link?.replace("?dl=1", "&dl=1");

                            if (currentTarget.src == linkCorrigido || currentTarget.src == "")
                                currentTarget.src = defaultImageLink;
                            else
                                currentTarget.src = linkCorrigido || "";
                        }}
                    />
                </Tooltip.Trigger>
                <Tooltip.Content className="w-80 max-w-[90vw]">
                    <img
                        className={classNames("w-full h-full object-contain", className)}
                        src={link || defaultImageLink}
                        alt={alt}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            let linkCorrigido = link?.replace("?dl=1", "&dl=1");

                            if (currentTarget.src == linkCorrigido || currentTarget.src == "")
                                currentTarget.src = defaultImageLink;
                            else
                                currentTarget.src = linkCorrigido || "";
                        }}
                    />
                </Tooltip.Content>
            </>
        </Tooltip>

    )
}

const Pequena = (props: PropsConteudo) => {
    return (
        <div className="w-12 h-12">
            <Conteudo {...props} />
        </div>
    )
}

const Media = (props: PropsConteudo) => {
    return (
        <div className="w-14 h-14">
            <Conteudo {...props} />
        </div>
    )
}

const Grande = (props: PropsConteudo) => {
    return (
        <div className="w-28 h-28">
            <Conteudo {...props} />
        </div>
    )
}

const Expansiva = (props: PropsConteudo) => {
    return (
        <div className="w-full h-full">
            <Conteudo {...props} />
        </div>
    )
}

Imagem.Perfil = ({ tamanho, ...props }: PropsImagemPerfil & PropsConteudo) => {
    const getTamanho = () => {
        switch (tamanho) {
            case "pequena": return <Pequena {...props} defaultImageLink="imagens/user.png" />
            case "media": return <Media {...props} defaultImageLink="imagens/user.png" />
            case "grande": return <Grande {...props} defaultImageLink="imagens/user.png" />
            case "expansiva": return <Expansiva {...props} defaultImageLink="imagens/user.png" />
        }
    }

    return (
        <Imagem>
            <div className="rounded-full w-fit overflow-hidden shadow">
                {getTamanho()}
            </div>
        </Imagem>
    )
};

Imagem.Padrao = ({ tamanho, ...props }: PropsImagemPadrao & PropsConteudo) => {
    const getTamanho = () => {
        switch (tamanho) {
            case "pequena": return <Pequena {...props} defaultImageLink="imagens/picture.png" />
            case "media": return <Media {...props} defaultImageLink="imagens/picture.png" />
            case "grande": return <Grande {...props} defaultImageLink="imagens/picture.png" />
            case "expansiva": return <Expansiva {...props} defaultImageLink="imagens/picture.png" />
        }
    }

    return (
        <Imagem>
            <div className="rounded-md w-fit overflow-hidden">
                {getTamanho()}
            </div>
        </Imagem>
    )
};

export default Imagem;