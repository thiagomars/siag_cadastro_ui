import { Control } from "react-hook-form";
import Formulario from "../../../components/Input";
import { typeSelect, typeSelectResponse } from "../../../types/select.d";
import { useEffect, useState } from "react";
import useToastLoading from "../../../hooks/useToastLoading";
import { getListaSelectSetorTrabalho } from "../../../services/setorTrabalho";

type Props = {
    control: Control<any>;
} & typeSelect;

export default function SelectSetor(props: Props) {
    const toast = useToastLoading();
    const {
        control,
        className,
        disabled,
        label,
        name,
        opcional,
        placeholder,
        isFiltro = false,
    } = props;
    const [opcoes, setOpcoes] = useState();

    useEffect(() => {
        carregarDados()
    }, []);

    async function carregarDados(): Promise<void> {
        const response = await getListaSelectSetorTrabalho();

        if (response.sucesso) {
            const opcoes = response.dados?.map((tipo: typeSelectResponse) => {
                return {
                    value: tipo.id,
                    label: tipo.descricao
                }
            })

            setOpcoes(opcoes);


        } else {
            toast({ mensagem: response.mensagem, tipo: response.tipo })
        }
    }

    return (
        <Formulario.InputSelect
            name={name || "setor"}
            label={label || "Setor"}
            control={control}
            disabled={disabled}
            opcional={opcional}
            options={opcoes}
            className={className}
            isFiltro={isFiltro}
            labelOpcaoPadrao={isFiltro ? "Todos" : "Selecione"}
            placeholder={isFiltro ? "Todos" : placeholder || "Selecione"}
        />
    );
}
