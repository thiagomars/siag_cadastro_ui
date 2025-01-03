import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import Formulario from "../../../components/Input";
import useDebounce from "../../../hooks/useDebounce";
import useToastLoading from "../../../hooks/useToastLoading";
import { typeSelect, typeSelectResponse } from "../../../types/select.d";
import { getSelectPrograma } from "../../../services/programa.ts";

type Props = {
    control: Control<any>,
    comNumero?: boolean
} & typeSelect;


export default function SelectPrograma({ children }: { children: React.ReactNode }): JSX.Element {
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
        filtroOpcoesPrograma("");
    }, [])

    const filtroOpcoesPrograma = useDebounce((pesquisa: string) => carregaSelectPrograma(pesquisa), 500);

    async function carregaSelectPrograma(pesquisa: string): Promise<void> {
        const dados = {
            pesquisa: pesquisa
        };

        const response = await getSelectPrograma(dados);

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
            name={name || "programa"}
            label={label || "Programa"}
            subTitulo={subTitulo || ""}
            control={control}
            disabled={disabled}
            opcional={opcional || false}
            onInputChange={filtroOpcoesPrograma}
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
        filtroOpcoesPrograma("");
    }, [])

    const filtroOpcoesPrograma = useDebounce((pesquisa: string) => carregaSelectDistribuidores(pesquisa), 500);

    async function carregaSelectDistribuidores(pesquisa: string): Promise<void> {
        const dados = {
            pesquisa: pesquisa
        };

        const response = await getSelectPrograma(dados);

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
            name={name || "programa"}
            label={label || "Depósito"}
            subTitulo={subTitulo || ""}
            control={control}
            disabled={disabled}
            opcional={opcional || false}
            onInputChange={filtroOpcoesPrograma}
            options={opcoesSelectDistribuidores}
            className={className}
            isFiltro={isFiltro}
            labelOpcaoPadrao={isFiltro ? "Todos" : (labelOpcaoPadrao || "Selecione")}
            placeholder={isFiltro ? "Todos" : (placeholder || "Selecione")}
        />
    )
}

SelectPrograma.Single = Single;
SelectPrograma.Multi = Multi;