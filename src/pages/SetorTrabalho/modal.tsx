import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getSetorTrabalhoById, postSetorTrabalhos, putSetorTrabalho } from "../../services/setorTrabalho";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { setorTrabalhoCadastro, setorTrabalhoListagem } from "../../types/setorTrabalho.d";
import SelectDeposito from "../../templates/selects/DepositoSelect";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setorTrabalhoSelecionado: setorTrabalhoListagem | null;
    setSetorTrabalhoSelecionado: React.Dispatch<React.SetStateAction<setorTrabalhoListagem | null>>;
    carregaSetorTrabalhos: Function;
}

export default function ModalSetorTrabalho(props: Props) {
    const { open, setOpen, setorTrabalhoSelecionado, setSetorTrabalhoSelecionado, carregaSetorTrabalhos } = props;

    const [id, setId] = useState(0);
    const [salvandoSetorTrabalho, setSalvandoSetorTrabalho] = useState<boolean>(false);
    const { register: SetorTrabalhoRegister, handleSubmit: SetorTrabalhoSubmit, reset: SetorTrabalhoReset, control: SetorTrabalhoControl } = useForm<setorTrabalhoCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (setorTrabalhoSelecionado != null) {
            carregaSetorTrabalhosPorId(setorTrabalhoSelecionado.setorTrabalhoId);
        }
    }, [setorTrabalhoSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoSetorTrabalho(true);
        toast({ mensagem: "Salvando Setor de Trabalho" });

        let dados: setorTrabalhoCadastro;

        await SetorTrabalhoSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = id > 0 ? () => putSetorTrabalho(dados) : () => postSetorTrabalhos(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Setor de Trabalho alterado com Sucesso!" : "Setor de Trabalho cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaSetorTrabalhos();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoSetorTrabalho(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setSetorTrabalhoSelecionado(null);
        setId(0);
        SetorTrabalhoReset({
            nmSetorTrabalho: "",
            setorTrabalhoId: 0,
            depositoId: 0
        })
    }

    async function carregaSetorTrabalhosPorId(id: number): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getSetorTrabalhoById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            SetorTrabalhoReset({
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
        return `Preencha os campos abaixo para ${id > 0 ? "editar" : "cadastrar"} um novo Setor de Trabalho `;
    }

    return (
        <ModalLateral
            title={id > 0 ? "Editar Setor de Trabalho" : "Cadastrar Setor de Trabalho"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoSetorTrabalho}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario>
                <Formulario.InputTexto
                    name="nmSetorTrabalho"
                    label="Descrição"
                    type="text"
                    disabled={salvandoSetorTrabalho}
                    opcional={false}
                    register={SetorTrabalhoRegister}
                />

                <SelectDeposito>
                    <SelectDeposito.Single
                        control={SetorTrabalhoControl}
                        disabled={salvandoSetorTrabalho}
                        opcional={false}
                    />
                </SelectDeposito>
            </Formulario>
        </ModalLateral>
    );
}