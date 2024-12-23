import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import Formulario from "../../../components/Input";
import useDebounce from "../../../hooks/useDebounce";
import useToastLoading from "../../../hooks/useToastLoading";
import { typeSelect, typeSelectResponse } from "../../../types/select.d";
import { getSelectAreaArmazenagem } from "../../../services/AreaArmazenagem.ts";

type Props = {
    control: Control<any>,
    comNumero?: boolean
} & typeSelect;


export default function SelectAreaArmazenagem({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            {children}
        </>
    )
}

const Single = (props: Props): JSX.Element => {

    const { control, className, disabled, label, name, opcional, labelOpcaoPadrao, placeholder, isFiltro = false, subTitulo, comNumero } = props;

    const [opcoesSelectDistribuidores, setOpcoesSelectDistribuidores] = useState();
    const toast = useToastLoading();

    useEffect(() => {
        filtroOpcoesAreaArmazenagem("");
    }, [])

    const filtroOpcoesAreaArmazenagem = useDebounce((pesquisa: string) => carregaSelectAreaArmazenagem(pesquisa), 500);

    async function carregaSelectAreaArmazenagem(pesquisa: string): Promise<void> {
        const dados = {
            pesquisa: pesquisa,
            comNumero: comNumero || false
        };

        const response = await getSelectAreaArmazenagem(dados);

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
            name={name || "areaArmazenagem"}
            label={label || "Área de Armazenagem"}
            subTitulo={subTitulo || ""}
            control={control}
            disabled={disabled}
            opcional={opcional || false}
            onInputChange={filtroOpcoesAreaArmazenagem}
            options={opcoesSelectDistribuidores}
            className={className}
            isFiltro={isFiltro}
            labelOpcaoPadrao={isFiltro ? "Todos" : (labelOpcaoPadrao || "Selecione")}
            placeholder={isFiltro ? "Todos" : (placeholder || "Selecione")}
        />
    )
}

const Multi = (props: Props): JSX.Element => {

    const { control, className, disabled, label, name, opcional, labelOpcaoPadrao, placeholder, isFiltro = false, subTitulo, comNumero } = props;

    const [opcoesSelectDistribuidores, setOpcoesSelectDistribuidores] = useState();
    const toast = useToastLoading();

    useEffect(() => {
        filtroOpcoesAreaArmazenagem("");
    }, [])

    const filtroOpcoesAreaArmazenagem = useDebounce((pesquisa: string) => carregaSelectDistribuidores(pesquisa), 500);

    async function carregaSelectDistribuidores(pesquisa: string): Promise<void> {
        const dados = {
            pesquisa: pesquisa,
            comNumero: comNumero || false
        };

        const response = await getSelectAreaArmazenagem(dados);

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
            name={name || "areaArmazenagem"}
            label={label || "Áreas de Armazenagem"}
            subTitulo={subTitulo || ""}
            control={control}
            disabled={disabled}
            opcional={opcional || false}
            onInputChange={filtroOpcoesAreaArmazenagem}
            options={opcoesSelectDistribuidores}
            className={className}
            isFiltro={isFiltro}
            labelOpcaoPadrao={isFiltro ? "Todos" : (labelOpcaoPadrao || "Selecione")}
            placeholder={isFiltro ? "Todos" : (placeholder || "Selecione")}
        />
    )
}

SelectAreaArmazenagem.Single = Single;
SelectAreaArmazenagem.Multi = Multi;