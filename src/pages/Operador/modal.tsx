import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getOperadorById, postOperadors, putOperador } from "../../services/operador";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { operadorCadastro, operadorListagem } from "../../types/operador.d";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    operadorSelecionado: operadorListagem | null;
    setoperadorSelecionado: React.Dispatch<React.SetStateAction<operadorListagem | null>>;
    carregaoperadors: Function;
}

export default function Modaloperador(props: Props) {
    const { open, setOpen, operadorSelecionado, setoperadorSelecionado, carregaoperadors } = props;

    const [id, setId] = useState("");
    const [salvandooperador, setSalvandooperador] = useState<boolean>(false);
    const { register: operadorRegister, handleSubmit: operadorSubmit, reset: operadorReset } = useForm<operadorCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (operadorSelecionado != null) {
            carregaoperadorsPorId(operadorSelecionado.id_operador.toString());
        }
    }, [operadorSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandooperador(true);
        toast({ mensagem: "Salvando operador" });

        let dados: operadorCadastro;

        await operadorSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = !!id ? () => putOperador(dados) : () => postOperadors(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: !!id ? "operador alterado com Sucesso!" : "operador cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaoperadors();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandooperador(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setoperadorSelecionado(null);
        setId("");
        operadorReset({
            nm_operador: "",
            nm_login: ""
        })
    }

    async function carregaoperadorsPorId(id: string): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getOperadorById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            operadorReset(response.dados);
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo,
                isLoading: false
            });
        }
    }

    function handleCloseModal(): void {
        setOpen(false);
        limparCampos();
    }

    function getSubtitulo(): string {
        return `Preencha os campos abaixo para ${!!id ? "editar" : "cadastrar"} um novo operador `;
    }

    return (
        <ModalLateral
            title={!!id ? "Editar operador" : "Cadastrar operador"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandooperador}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="col-span-2 grid grid-cols-2">
                <Formulario.InputTexto
                    name="nm_operador"
                    label="Nome operador"
                    type="text"
                    disabled={salvandooperador}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={operadorRegister}
                />
                <Formulario.InputTexto
                    name="nm_login"
                    label="Login"
                    type="text"
                    disabled={salvandooperador}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={operadorRegister}
                />
                <Formulario.InputTexto
                    name="nm_cpf"
                    label="CPF"
                    type="text"
                    disabled={salvandooperador}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={operadorRegister}
                />

            </Formulario>
        </ModalLateral>
    );
}