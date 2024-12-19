import * as Tabs from '@radix-ui/react-tabs';
import Select from 'react-select';
import { typeSelectOptions } from '../../types/select.d';
import classNames from "../../utils/classNames";

type PropsAbas = {
    children?: Array<JSX.Element>
    value: string;
    onChange: Function;
}

type PropsTitulo = {
    titulos: Array<string>;
    disabled?: Array<boolean>;
    margin?: string | null;
    value: string;
    onChange: Function;
}

type PropsContudo = {
    children?: Array<JSX.Element> | JSX.Element;
    value: string;
}

type typeSelectAbasOptions = {
    isDisabled: boolean;
} & typeSelectOptions;

export default function Abas({ children, ...props }: PropsAbas) {
    const { ...propsAbas } = props;

    return (
        <Tabs.Root
            onValueChange={e => propsAbas.onChange(e)}
            value={propsAbas.value}
            className="flex flex-col gap-2">
            {children}
        </Tabs.Root>
    )
}

Abas.Titulo = ({ ...props }: PropsTitulo) => {
    const { ...propsAbas } = props;

    let options: Array<typeSelectAbasOptions> = [];

    options = propsAbas.titulos.map((titulo, index) => {
        return { value: titulo, label: titulo, isDisabled: !!propsAbas?.disabled && !!propsAbas.disabled[index] }
    })

    return (
        <>
            <div className='block sm:hidden'>
                <Select
                    className={classNames("", propsAbas.margin ? propsAbas.margin : "mx-6")}
                    name={"abaSelecionada"}
                    id={"abaSelecionada"}
                    options={options}
                    isDisabled={false}
                    isClearable={false}
                    value={options.find(x => x.value == propsAbas.value)}
                    onChange={option => {
                        if (!option?.isDisabled)
                            propsAbas.onChange(option?.value);
                    }}
                />
            </div>

            <div className='hidden sm:block'>
                <Tabs.List className={classNames("overflow-hidden bg-white flex flex-row justify-between rounded-md mt-0", propsAbas.margin ? propsAbas.margin : "mx-6")}>
                    {propsAbas.titulos?.map((valor, index) => {

                        const disabled = propsAbas?.disabled ? propsAbas.disabled[index] : false;

                        return <Tabs.Trigger
                            value={valor}
                            key={valor}
                            disabled={disabled}
                            className={classNames(" w-full py-3 data-[state=active]:ring-primary-600 data-[state=active]:border-b-2 data-[state=active]:border-primary-600 text-sm font-medium hover:bg-gray-50 text-gray-700 data-[state=inactive]:text-gray-500 ", disabled ? "cursor-not-allowed" : "cursor-pointer")} >
                            {valor}
                        </Tabs.Trigger>
                    })}

                </Tabs.List>
            </div>
        </>
    )

}

Abas.Conteudo = ({ children, ...props }: PropsContudo) => {
    const { ...propsAbas } = props;

    return (
        <Tabs.Content value={propsAbas.value} >
            {children}
        </Tabs.Content>
    )
}
