import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import Formulario from "../../../components/Input";
import useDebounce from "../../../hooks/useDebounce";
import useToastLoading from "../../../hooks/useToastLoading";
import { typeSelect, typeSelectResponse } from "../../../types/select.d";
import { getSelectEndereco } from "../../../services/endereco.ts";

type Props = {
    control: Control<any>,
    comNumero?: boolean
} & typeSelect;


export default function SelectEndereco({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            {children}
        </>
    )
}

const Single = (props: Props): JSX.Element => {

    const { control, className, disabled, label, name, opcional, labelOpcaoPadrao, placeholder, isFiltro = false, subTitulo } = props;

    const [opcoesSelectDistribuidores, setOpcoesSelectDistribuidores] = useState();
    const toast = useToastLoading();

    useEffect(() => {
        filtroOpcoesEndereco("");
    }, [])

    const filtroOpcoesEndereco = useDebounce((pesquisa: string) => carregaSelectEndereco(pesquisa), 500);

    async function carregaSelectEndereco(pesquisa: string): Promise<void> {
        const dados = {
            pesquisa: pesquisa
        };

        const response = await getSelectEndereco(dados);

        if (response.sucesso) {
            const opcoes = response.dados?.map((tipo: typeSelectResponse) => {
                return {
                    value: tipo.id,
                    label: tipo.descricao
                }
            })

            setOpcoesSelectDistribuidores(opcoes);


        } else {
            toast({ mensagem: response.mensagem, tipo: response.tipo })
        }
    }

    return (
        <Formulario.InputSelect
            name={name || "endereco"}
            label={label || "Endereço"}
            subTitulo={subTitulo || ""}
            control={control}
            disabled={disabled}
            opcional={opcional || false}
            onInputChange={filtroOpcoesEndereco}
            options={opcoesSelectDistribuidores}
            className={className}
            isFiltro={isFiltro}
            labelOpcaoPadrao={isFiltro ? "Todos" : (labelOpcaoPadrao || "Selecione")}
            placeholder={isFiltro ? "Todos" : (placeholder || "Selecione")}
        />
    )
}

const Multi = (props: Props): JSX.Element => {

    const { control, className, disabled, label, name, opcional, labelOpcaoPadrao, placeholder, isFiltro = false, subTitulo } = props;

    const [opcoesSelectDistribuidores, setOpcoesSelectDistribuidores] = useState();
    const toast = useToastLoading();

    useEffect(() => {
        filtroOpcoesEndereco("");
    }, [])

    const filtroOpcoesEndereco = useDebounce((pesquisa: string) => carregaSelectDistribuidores(pesquisa), 500);

    async function carregaSelectDistribuidores(pesquisa: string): Promise<void> {
        const dados = {
            pesquisa: pesquisa
        };

        const response = await getSelectEndereco(dados);

        if (response.sucesso) {
            const opcoes = response.dados?.map((tipo: typeSelectResponse) => {
                return {
                    value: tipo.id,
                    label: tipo.descricao
                }
            })

            setOpcoesSelectDistribuidores(opcoes);


        } else {
            toast({ mensagem: response.mensagem, tipo: response.tipo })
        }
    }

    return (
        <Formulario.InputSelectMulti
            name={name || "endereco"}
            label={label || "Endereço"}
            subTitulo={subTitulo || ""}
            control={control}
            disabled={disabled}
            opcional={opcional || false}
            onInputChange={filtroOpcoesEndereco}
            options={opcoesSelectDistribuidores}
            className={className}
            isFiltro={isFiltro}
            labelOpcaoPadrao={isFiltro ? "Todos" : (labelOpcaoPadrao || "Selecione")}
            placeholder={isFiltro ? "Todos" : (placeholder || "Selecione")}
        />
    )
}

SelectEndereco.Single = Single;
SelectEndereco.Multi = Multi;