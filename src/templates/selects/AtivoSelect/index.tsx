import { Control } from "react-hook-form";
import Formulario from "../../../components/Input";
import { typeSelect } from "../../../types/select.d";

type Props = {
    control: Control<any>;
} & typeSelect;

export default function SelectAtivo(props: Props) {
    const { control, className, disabled, label, name, opcional, placeholder, isFiltro = false } = props;
    const opcoesSelectAtivo = [
        { value: true, label: "Ativo" },
        { value: false, label: "Inativo" }
    ];

    return (
        <Formulario.InputSelect
            name={name || "ativo"}
            label={label || "Ativo"}
            control={control}
            disabled={disabled}
            opcional={opcional}
            options={opcoesSelectAtivo}
            className={className}
            isFiltro={isFiltro}
            labelOpcaoPadrao={isFiltro ? "Todos" : "Selecione"}
            placeholder={isFiltro ? "Todos" : (placeholder || "Selecione")}
        />)
}