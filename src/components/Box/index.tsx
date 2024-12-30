import { useAutoAnimate } from "@formkit/auto-animate/react";
import classNames from "../../utils/classNames";
import LoadingPage from "../LoadingPage";
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string;
    children?: React.ReactNode;
    horizontal?: boolean,
}

type PropsHeader = {
    className?: string;
    children?: React.ReactNode;
    padding?: string
}

export const BoxContainer = ({ children, className, horizontal }: Props) => {
    const [autoAnimateRef] = useAutoAnimate();

    return (
        <div ref={autoAnimateRef} className={classNames(
            "flex gap-4",
            !horizontal && "flex-col",
            className
        )}>
            {children}
        </div>
    )
}

BoxContainer.Header = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="w-full flex flex-col py-1">
            {children}
        </div>
    )
}

BoxContainer.Titulo = ({ children }: { children: React.ReactNode }) => {

    return (
        <h1 className="text-2xl font-bold drop-shadow-md text-gray-700">
            {children}
        </h1>
    )
}

BoxContainer.SubTitulo = ({ children, textCenter }: { children: React.ReactNode, textCenter?: boolean }) => {

    return (
        <h1 className={classNames("text-base font-normal drop-shadow-sm text-gray-700 text-justify", !!textCenter && "text-center")}>
            {children}
        </h1>
    )
}

type PropsBox = {
    className?: string;
    children?: React.ReactNode;
    horizontal?: boolean,
    style?: React.CSSProperties,
    loading?: boolean
}

export default function Box(props: PropsBox): JSX.Element {
    const {
        className,
        children,
        horizontal,
        style,
        loading
    } = props;

    return (
        <div
            className={twMerge(classNames(
                "bg-white p-4 shadow-md flex rounded-lg gap-y-2",
                !horizontal && "flex-col"),
                className
            )}
            style={style}
        >
            {children}

            {loading && (
                <LoadingPage />
            )}
        </div>
    )
}

const Header = (props: PropsHeader): JSX.Element => {
    const {
        children,
        className,
        padding = "pb-3"
    } = props;

    return (
        <div className={classNames("flex w-full justify-between items-center border-b col-span-full", className, padding)}>
            {children}
        </div>
    )
}

type PropsContent = {
    children: React.ReactNode | string | string,
    flexDirection?: "flex-row" | "flex-col",
    className?: string;
}

const Content = ({ children, flexDirection = "flex-row", className }: PropsContent) => {
    return (
        <div className={classNames("flex flex-col gap-2 items-start w-[97%]", flexDirection, className)}>
            {children}
        </div>
    )
}

Content.Titulo = ({ children }: { children: React.ReactNode | string }) => {
    return (
        <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
            {children}
        </h2>
    )
}

Content.Subtitulo = ({ children, widthFull = true }: { children: React.ReactNode, widthFull?: boolean }) => {
    return (
        <p className={classNames(widthFull ? "w-full" : "max-w-2xl", "font-normal text-sm text-gray-500")}>
            {children}
        </p>
    )
}

Header.Botoes = ({ children }: { children: React.ReactNode | string }) => {
    return (
        <>
            {children}
        </>
    )
}

Header.Content = Content;
Box.Header = Header;