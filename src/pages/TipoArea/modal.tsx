import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getTipoAreaById, postTipoAreas, putTipoArea } from "../../services/tipoArea";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { tipoAreaCadastro, tipoAreaListagem } from "../../types/tipoArea.d";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    tipoAreaSelecionado: tipoAreaListagem | null;
    setTipoAreaSelecionado: React.Dispatch<React.SetStateAction<tipoAreaListagem | null>>;
    carregaTipoAreas: Function;
}

export default function ModalTipoArea(props: Props) {
    const { open, setOpen, tipoAreaSelecionado, setTipoAreaSelecionado, carregaTipoAreas } = props;

    const [id, setId] = useState(0);
    const [salvandoTipoArea, setSalvandoTipoArea] = useState<boolean>(false);
    const { register: TipoAreaRegister, handleSubmit: TipoAreaSubmit, reset: TipoAreaReset } = useForm<tipoAreaCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (tipoAreaSelecionado != null) {
            carregaTipoAreasPorId(tipoAreaSelecionado.tipoAreaId);
        }
    }, [tipoAreaSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoTipoArea(true);
        toast({ mensagem: "Salvando Tipo de Área" });

        let dados: tipoAreaCadastro;

        await TipoAreaSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = id > 0 ? () => putTipoArea(dados) : () => postTipoAreas(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Tipo de Área alterado com Sucesso!" : "Tipo de Área cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaTipoAreas();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoTipoArea(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setTipoAreaSelecionado(null);
        setId(0);
        TipoAreaReset({
            nmTipoArea: "",
            tipoAreaId: 0
        })
    }

    async function carregaTipoAreasPorId(id: number): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getTipoAreaById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            TipoAreaReset(response.dados);
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
        return `Preencha os campos abaixo para ${id > 0 ? "editar" : "cadastrar"} um novo Tipo de Área `;
    }

    return (
        <ModalLateral
            title={id > 0 ? "Editar Tipo de Área" : "Cadastrar Tipo de Área"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoTipoArea}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="col-span-2 grid grid-cols-2">
                <Formulario.InputTexto
                    name="nmTipoArea"
                    label="Descrição"
                    type="text"
                    disabled={salvandoTipoArea}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TipoAreaRegister}
                />
            </Formulario>
        </ModalLateral>
    );
}