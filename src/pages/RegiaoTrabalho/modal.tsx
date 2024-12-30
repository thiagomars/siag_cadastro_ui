import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getRegiaoTrabalhoById, postRegiaoTrabalhos, putRegiaoTrabalho } from "../../services/regiaoTrabalho";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { regiaoTrabalhoCadastro, regiaoTrabalhoListagem } from "../../types/regiaoTrabalho.d";
import SelectDeposito from "../../templates/selects/DepositoSelect";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    regiaoTrabalhoSelecionado: regiaoTrabalhoListagem | null;
    setRegiaoTrabalhoSelecionado: React.Dispatch<React.SetStateAction<regiaoTrabalhoListagem | null>>;
    carregaRegiaoTrabalhos: Function;
}

export default function ModalRegiaoTrabalho(props: Props) {
    const { open, setOpen, regiaoTrabalhoSelecionado, setRegiaoTrabalhoSelecionado, carregaRegiaoTrabalhos } = props;

    const [id, setId] = useState(0);
    const [salvandoRegiaoTrabalho, setSalvandoRegiaoTrabalho] = useState<boolean>(false);
    const { register: RegiaoTrabalhoRegister, handleSubmit: RegiaoTrabalhoSubmit, reset: RegiaoTrabalhoReset, control: RegiaoTrabalhoControl } = useForm<regiaoTrabalhoCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (regiaoTrabalhoSelecionado != null) {
            carregaRegiaoTrabalhosPorId(regiaoTrabalhoSelecionado.regiaoTrabalhoId);
        }
    }, [regiaoTrabalhoSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoRegiaoTrabalho(true);
        toast({ mensagem: "Salvando Região de Trabalho" });

        let dados: regiaoTrabalhoCadastro;

        await RegiaoTrabalhoSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = id > 0 ? () => putRegiaoTrabalho(dados) : () => postRegiaoTrabalhos(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Região de Trabalho alterado com Sucesso!" : "Região de Trabalho cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaRegiaoTrabalhos();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoRegiaoTrabalho(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setRegiaoTrabalhoSelecionado(null);
        setId(0);
        RegiaoTrabalhoReset({
            nmRegiaoTrabalho: "",
            regiaoTrabalhoId: 0,
            depositoId: 0
        })
    }

    async function carregaRegiaoTrabalhosPorId(id: number): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getRegiaoTrabalhoById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            RegiaoTrabalhoReset({
                ...response.dados,
                deposito: {
                    value: response.dados?.deposito?.depositoId,
                    label: response.dados?.deposito?.depositoId + " - " + response.dados?.deposito?.nmDeposito
                }
            });
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
        return `Preencha os campos abaixo para ${id > 0 ? "editar" : "cadastrar"} um novo Região de Trabalho `;
    }

    return (
        <ModalLateral
            title={id > 0 ? "Editar Região de Trabalho" : "Cadastrar Região de Trabalho"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoRegiaoTrabalho}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario>
                <Formulario.InputTexto
                    name="nmRegiaoTrabalho"
                    label="Descrição"
                    type="text"
                    disabled={salvandoRegiaoTrabalho}
                    opcional={false}
                    register={RegiaoTrabalhoRegister}
                />

                <SelectDeposito>
                    <SelectDeposito.Single
                        control={RegiaoTrabalhoControl}
                        disabled={salvandoRegiaoTrabalho}
                        opcional={false}
                    />
                </SelectDeposito>
            </Formulario>
        </ModalLateral>
    );
}