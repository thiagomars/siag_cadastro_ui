import classNames from '../../utils/classNames';
import Box from '../Box';

type ElementProps = {
    children: JSX.Element | Array<JSX.Element>
}

type TitulosProps = {
    children: JSX.Element | Array<JSX.Element> | string;
}

type CardContentProps = {
    children: JSX.Element | Array<JSX.Element> | string;
    className?: string;
}

const Cards = ({ children }: ElementProps): JSX.Element => {
    return (
        <>
            {children}
        </>
    )
}

const Header = ({ children }: ElementProps): JSX.Element => {
    return (
        <Box>
            <Box.Header className='border-b-0' padding='pb-0'>
                <>{children}</>
            </Box.Header>
        </Box>
    )
}

const Content = ({ children }: ElementProps): JSX.Element => {
    return (
        <Box.Header.Content>
            <>{children}</>
        </Box.Header.Content>
    )
}

Content.Titulo = ({ children }: TitulosProps): JSX.Element => {
    return (
        <Box.Header.Content.Titulo>{children}</Box.Header.Content.Titulo>
    )
}

Content.Subtitulo = ({ children }: TitulosProps): JSX.Element => {
    return (
        <Box.Header.Content.Subtitulo>{children}</Box.Header.Content.Subtitulo>
    )
}

Header.Botoes = ({ children }: ElementProps): JSX.Element => {
    return (
        <Box.Header.Botoes>
            <div className="flex flex-row gap-4 mt-2 lg:mt-0">
                {children}
            </div>
        </Box.Header.Botoes>
    )
}

const CardContent = ({ children, className }: CardContentProps): JSX.Element => {
    return (
        <div className={classNames('grid items-center gap-4', className || "grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3")}>
            {children}
        </div>
    )
}

const Card = ({ children }: ElementProps): JSX.Element => {
    return (
        <Box className='flex flex-col h-full gap-2 justify-between'>
            {children}
        </Box>
    );
}

Card.Header = ({ children }: ElementProps): JSX.Element => {
    return (
        <div className='flex flex-row items-center justify-between w-full'>
            {children}
        </div>
    )
}

Card.Body = ({ children }: ElementProps): JSX.Element => {
    return (
        <div className='flex flex-row justify-between gap-4 flex-1'>
            {children}
        </div>
    )
}

Card.Footer = ({ children }: ElementProps): JSX.Element => {
    return (
        <div className='flex flex-row gap-4 h-fit'>
            {children}
        </div>
    )
}

CardContent.Card = Card;
Header.Content = Content;
Cards.Header = Header;
Cards.Content = CardContent;
export default Cards;