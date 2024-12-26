import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getTipoEnderecoById, postTipoEnderecos, putTipoEndereco } from "../../services/tipoEndereco";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { tipoEnderecoCadastro, tipoEnderecoListagem } from "../../types/tipoEndereco.d";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    tipoEnderecoSelecionado: tipoEnderecoListagem | null;
    setTipoEnderecoSelecionado: React.Dispatch<React.SetStateAction<tipoEnderecoListagem | null>>;
    carregaTipoEnderecos: Function;
}

export default function ModalTipoEndereco(props: Props) {
    const { open, setOpen, tipoEnderecoSelecionado, setTipoEnderecoSelecionado, carregaTipoEnderecos } = props;

    const [id, setId] = useState(0);
    const [salvandoTipoEndereco, setSalvandoTipoEndereco] = useState<boolean>(false);
    const { register: TipoEnderecoRegister, handleSubmit: TipoEnderecoSubmit, reset: TipoEnderecoReset } = useForm<tipoEnderecoCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (tipoEnderecoSelecionado != null) {
            carregaTipoEnderecosPorId(tipoEnderecoSelecionado.tipoEnderecoId);
        }
    }, [tipoEnderecoSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoTipoEndereco(true);
        toast({ mensagem: "Salvando Tipo de Endereço" });

        let dados: tipoEnderecoCadastro;

        await TipoEnderecoSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = id > 0 ? () => putTipoEndereco(dados) : () => postTipoEnderecos(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Tipo de Endereço alterado com Sucesso!" : "Tipo de Endereço cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaTipoEnderecos();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoTipoEndereco(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setTipoEnderecoSelecionado(null);
        setId(0);
        TipoEnderecoReset({
            nmTipoEndereco: "",
            tipoEnderecoId: 0
        })
    }

    async function carregaTipoEnderecosPorId(id: number): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getTipoEnderecoById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            TipoEnderecoReset(response.dados);
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
        return `Preencha os campos abaixo para ${id > 0 ? "editar" : "cadastrar"} um novo Tipo de Endereço `;
    }

    return (
        <ModalLateral
            title={id > 0 ? "Editar Tipo de Endereço" : "Cadastrar Tipo de Endereço"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoTipoEndereco}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="col-span-2 grid grid-cols-2">
                <Formulario.InputTexto
                    name="nmTipoEndereco"
                    label="Descrição"
                    type="text"
                    disabled={salvandoTipoEndereco}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TipoEnderecoRegister}
                />
            </Formulario>
        </ModalLateral>
    );
}