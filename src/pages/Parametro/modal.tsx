import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getParametroById, postParametros, putParametro } from "../../services/parametro";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { parametroCadastro, parametroListagem } from "../../types/parametro.d";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ParametroSelecionado: parametroListagem | null;
    setParametroSelecionado: React.Dispatch<React.SetStateAction<parametroListagem | null>>;
    carregaParametros: Function;
}

export default function ModalParametro(props: Props) {
    const { open, setOpen, ParametroSelecionado, setParametroSelecionado, carregaParametros } = props;

    const [id, setId] = useState("");
    const [salvandoParametro, setSalvandoParametro] = useState<boolean>(false);
    const { register: ParametroRegister, handleSubmit: ParametroSubmit, reset: ParametroReset } = useForm<parametroCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (ParametroSelecionado != null) {
            carregaParametrosPorId(ParametroSelecionado.id_parametro.toString());
        }
    }, [ParametroSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoParametro(true);
        toast({ mensagem: "Salvando Parametro" });

        let dados: parametroCadastro;

        await ParametroSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = !!id ? () => putParametro(dados) : () => postParametros(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: !!id ? "Parametro alterado com Sucesso!" : "Parametro cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaParametros();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoParametro(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setParametroSelecionado(null);
        setId("");
        ParametroReset({
            nm_parametro: "",
            nm_valor: ""
        })
    }

    async function carregaParametrosPorId(id: string): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getParametroById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            ParametroReset(response.dados);
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
        return `Preencha os campos abaixo para ${!!id ? "editar" : "cadastrar"} um novo parametro `;
    }

    return (
        <ModalLateral
            title={!!id ? "Editar Parametro" : "Cadastrar Parametro"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoParametro}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="col-span-2 grid grid-cols-2">
                <Formulario.InputTexto
                    name="nm_parametro"
                    label="Nome Parametro"
                    type="text"
                    disabled={salvandoParametro}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ParametroRegister}
                />
                <Formulario.InputTexto
                    name="nm_valor"
                    label="Valor"
                    type="text"
                    disabled={salvandoParametro}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ParametroRegister}
                />
                <Formulario.InputTexto
                    name="nm_tipo"
                    label="Tipo"
                    type="text"
                    disabled={salvandoParametro}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ParametroRegister}
                />

            </Formulario>
        </ModalLateral>
    );
}