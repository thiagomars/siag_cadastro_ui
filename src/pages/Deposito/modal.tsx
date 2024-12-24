import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getDepositoById, postDepositos, putDeposito } from "../../services/deposito";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { depositoCadastro, depositoListagem } from "../../types/deposito.d";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    depositoSelecionado: depositoListagem | null;
    setDepositoSelecionado: React.Dispatch<React.SetStateAction<depositoListagem | null>>;
    carregaDepositos: Function;
}

export default function ModalDeposito(props: Props) {
    const { open, setOpen, depositoSelecionado, setDepositoSelecionado, carregaDepositos } = props;

    const [id, setId] = useState(0);
    const [salvandoDeposito, setSalvandoDeposito] = useState<boolean>(false);
    const { register: DepositoRegister, handleSubmit: DepositoSubmit, reset: DepositoReset } = useForm<depositoCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (depositoSelecionado != null) {
            carregaDepositosPorId(depositoSelecionado.depositoId);
        }
    }, [depositoSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoDeposito(true);
        toast({ mensagem: "Salvando Deposito" });

        let dados: depositoCadastro;

        await DepositoSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = id > 0 ? () => putDeposito(dados) : () => postDepositos(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Depósito alterado com Sucesso!" : "Depósito cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaDepositos();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoDeposito(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setDepositoSelecionado(null);
        setId(0);
        DepositoReset({
            nmDeposito: "",
            depositoId: 0
        })
    }

    async function carregaDepositosPorId(id: number): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getDepositoById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            DepositoReset(response.dados);
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
        return `Preencha os campos abaixo para ${id > 0 ? "editar" : "cadastrar"} uma nova Deposito `;
    }

    return (
        <ModalLateral
            title={id > 0 ? "Editar Deposito" : "Cadastrar Deposito"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoDeposito}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="col-span-2 grid grid-cols-2">
                <Formulario.InputTexto
                    name="nmDeposito"
                    label="Descrição"
                    type="text"
                    disabled={salvandoDeposito}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={DepositoRegister}
                />
            </Formulario>
        </ModalLateral>
    );
}