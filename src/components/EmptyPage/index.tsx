import { IconType } from 'react-icons/lib';
import Botao from '../Button';
import { IconeAtual } from '../IconeAtual';

type Props = {
    texto?: string;
    Icone?: IconType;
    acao?: Function;
    botao?: boolean;
    textoBotao?: string
}

export default function EmptyPage(props: Props): JSX.Element {
    const { texto, acao, botao, textoBotao = "Adicionar", Icone } = props

    return (
        <div className="relative block w-full py-8 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
            {Icone
                ? <Icone className={"w-12 h-12 text-primary-900 inline-flex "} />
                : <IconeAtual className={"w-12 h-12 text-gray-400 inline-flex "} />
            }
            <span className="mt-6 mb-8 block text-md font-medium text-primary-900">{texto}</span>
            {botao &&
                <Botao
                    onClick={() => acao && acao()}
                    texto={textoBotao}
                    className={"inline-flex items-center"}
                    tipo={"sucesso"} />
            }
        </div>
    )
}
