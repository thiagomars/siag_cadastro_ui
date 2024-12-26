import { Control } from "react-hook-form";
import Formulario from "../../../components/Input";
import { typeSelect, typeSelectOptions } from "../../../types/select.d";

type Props = {
    control: Control<any>;
} & typeSelect;

export default function SelectSetor(props: Props) {
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
    const opcoesSelectAtivo: typeSelectOptions[] = [];

    return (
        <Formulario.InputSelect
            name={name || "setor"}
            label={label || "Setor"}
            control={control}
            disabled={disabled}
            opcional={opcional}
            options={opcoesSelectAtivo}
            className={className}
            isFiltro={isFiltro}
            labelOpcaoPadrao={isFiltro ? "Todos" : "Selecione"}
            placeholder={isFiltro ? "Todos" : placeholder || "Selecione"}
        />
    );
}
