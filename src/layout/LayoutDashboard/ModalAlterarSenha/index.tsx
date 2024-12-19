import { useForm } from "react-hook-form";
import Formulario from "../../../components/Input";
import Modal from "../../../components/Modal";
import PasswordInput from "../../../templates/inputs/PasswordInput";
// import { useState } from "react";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalAlterarSenha(props: Props) {
    
    const {
        open, setOpen
    } = props;

    const { register } = useForm();

    // const [salvandoCadastro, setSalvandoCadastro] = useState<boolean>(false);

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            tipo="sucesso"
            widthClassName="w-1/3"
        >
            <Modal.Titulo texto="Alterar senha" tipo="sucesso" />

            <Formulario>
                <PasswordInput
                    register={register}
                    opcional
                    // disabled={salvandoCadastro}
                    name="senhaAtual"
                    label="Senha atual"
                />
                <PasswordInput
                    register={register}
                    opcional
                    // disabled={salvandoCadastro}
                    name="senha"
                    label="Nova senha"
                />
                <PasswordInput
                    register={register}
                    opcional
                    // disabled={salvandoCadastro}
                    name="confirmarSenha"
                    label="Confirmar senha"
                />
            </Formulario>

            <Modal.ContainerBotoes>
                <Modal.BotaoCancelar></Modal.BotaoCancelar>
                <Modal.BotaoAcao
                    acao={() => { }}
                    textoBotao="Salvar"
                    tipo="sucesso"
                />
            </Modal.ContainerBotoes>
        </Modal>
    )
}