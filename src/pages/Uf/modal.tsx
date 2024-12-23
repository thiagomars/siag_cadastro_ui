import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getUfById, postUfs, putUf } from "../../services/uf";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { ufCadastro, ufListagem } from "../../types/uf.d";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ufSelecionado: ufListagem | null;
    setUfSelecionado: React.Dispatch<React.SetStateAction<ufListagem | null>>;
    carregaUfs: Function;
}

export default function ModalUf(props: Props) {
    const { open, setOpen, ufSelecionado, setUfSelecionado, carregaUfs } = props;

    const [id, setId] = useState(0);
    const [salvandoUf, setSalvandoUf] = useState<boolean>(false);
    const { register: UfRegister, handleSubmit: UfSubmit, reset: UfReset } = useForm<ufCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (ufSelecionado != null) {
            carregaUfsPorId(ufSelecionado.id);
        }
    }, [ufSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoUf(true);
        toast({ mensagem: "Salvando UF" });

        let dados: ufCadastro;

        await UfSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = id > 0 ? () => putUf(dados) : () => postUfs(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "UF alterado com Sucesso!" : "UF cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaUfs();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoUf(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setUfSelecionado(null);
        setId(0);
        UfReset({
            nm_nomeuf: "",
            nm_uf: ""
        })
    }

    async function carregaUfsPorId(id: number): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getUfById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            UfReset(response.dados);
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
        return `Preencha os campos abaixo para ${id > 0 ? "editar" : "cadastrar"} uma nova UF `;
    }

    return (
        <ModalLateral
            title={id > 0 ? "Editar UF" : "Cadastrar UF"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoUf}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="col-span-2 grid grid-cols-2">
                <Formulario.InputTexto
                    name="nm_uf"
                    label="UF"
                    type="text"
                    disabled={salvandoUf}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={UfRegister}
                />
                <Formulario.InputTexto
                    name="nm_nomeuf"
                    label="Nome UF"
                    type="text"
                    disabled={salvandoUf}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={UfRegister}
                />

            </Formulario>
        </ModalLateral>
    );
}