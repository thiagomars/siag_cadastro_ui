import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import Formulario from "../../../components/Input";
import useDebounce from "../../../hooks/useDebounce";
import useToastLoading from "../../../hooks/useToastLoading";
import { typeSelect, typeSelectResponse } from "../../../types/select.d";
import { getSelectStatusAgrupadorAtivo } from "../../../services/status.ts";

type Props = {
    control: Control<any>,
    comNumero?: boolean
} & typeSelect;


export default function SelectStatusAgrupadorAtivo({ children }: { children: React.ReactNode }): JSX.Element {
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
        filtroOpcoesStatusAgrupadorAtivo("");
    }, [])

    const filtroOpcoesStatusAgrupadorAtivo = useDebounce((pesquisa: string) => carregaSelectStatusAgrupadorAtivo(pesquisa), 500);

    async function carregaSelectStatusAgrupadorAtivo(pesquisa: string): Promise<void> {
        const dados = {
            pesquisa: pesquisa
        };

        const response = await getSelectStatusAgrupadorAtivo(dados);

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
            name={name || "statusAgrupadorAtivo"}
            label={label || "Status"}
            subTitulo={subTitulo || ""}
            control={control}
            disabled={disabled}
            opcional={opcional || false}
            onInputChange={filtroOpcoesStatusAgrupadorAtivo}
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
        filtroOpcoesStatusAgrupadorAtivo("");
    }, [])

    const filtroOpcoesStatusAgrupadorAtivo = useDebounce((pesquisa: string) => carregaSelectDistribuidores(pesquisa), 500);

    async function carregaSelectDistribuidores(pesquisa: string): Promise<void> {
        const dados = {
            pesquisa: pesquisa
        };

        const response = await getSelectStatusAgrupadorAtivo(dados);

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
            name={name || "statusAgrupadorAtivo"}
            label={label || "Status"}
            subTitulo={subTitulo || ""}
            control={control}
            disabled={disabled}
            opcional={opcional || false}
            onInputChange={filtroOpcoesStatusAgrupadorAtivo}
            options={opcoesSelectDistribuidores}
            className={className}
            isFiltro={isFiltro}
            labelOpcaoPadrao={isFiltro ? "Todos" : (labelOpcaoPadrao || "Selecione")}
            placeholder={isFiltro ? "Todos" : (placeholder || "Selecione")}
        />
    )
}

SelectStatusAgrupadorAtivo.Single = Single;
SelectStatusAgrupadorAtivo.Multi = Multi;