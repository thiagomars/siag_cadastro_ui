import { FieldValues, UseFormRegister } from "react-hook-form";
import Formulario from "../../../components/Input";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
    register: UseFormRegister<FieldValues>;
    opcional?: boolean;
    disabled?: boolean;
    label?: string;
    name?: string;
}

export default function PasswordInput({
    register,
    opcional = false,
    disabled,
    label,
    name
}: Props) {

    const [viewPassword, setViewPassword] = useState<boolean>(false);

    const alterarVisibilidadeSenha = () => {
        setViewPassword(prev => !prev);
    }
    
    return (
        <Formulario.InputTexto
            name={name ?? "senha"}
            label={label ?? "Senha para monitoramento Wi-Fi de cada inversor"}
            register={register}
            buttonActionIcon={viewPassword ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
            buttonActionFunction={alterarVisibilidadeSenha}
            type={viewPassword ? "text" : "password"}
            lowercase
            opcional={opcional}
            disabled={disabled}
        />
    )
}