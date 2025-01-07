import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getProgramaById, postProgramas, putPrograma } from "../../services/programa";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { ProgramaCadastro, ProgramaListagem } from "../../types/programa.d";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    ProgramaSelecionado: ProgramaListagem | null;
    setProgramaSelecionado: React.Dispatch<React.SetStateAction<ProgramaListagem | null>>;
    carregaProgramas: Function;
}

export default function ModalPrograma(props: Props) {
    const { open, setOpen, ProgramaSelecionado, setProgramaSelecionado, carregaProgramas } = props;

    const [id, setId] = useState("");
    const [salvandoPrograma, setSalvandoPrograma] = useState<boolean>(false);
    const { register: ProgramaRegister, handleSubmit: ProgramaSubmit, reset: ProgramaReset, control: ProgramaControl } = useForm<ProgramaCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (ProgramaSelecionado != null) {
            carregaProgramasPorId(ProgramaSelecionado.programaId.toString());
        }
    }, [ProgramaSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoPrograma(true);
        toast({ mensagem: "Salvando Programa" });

        let dados: ProgramaCadastro;

        await ProgramaSubmit((dadosForm) => dados = {
            ...dadosForm,
            cdEquipamento: dadosForm.cdEquipamento.toString()
        })();

        const request = !!id ? () => putPrograma(dados) : () => postProgramas(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: !!id ? "Programa alterado com Sucesso!" : "Programa cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaProgramas();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoPrograma(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setProgramaSelecionado(null);
        setId("");
        ProgramaReset({
            cdPrograma: 0,
            cdDocumento: 0,
            cdFabrica : 0,
            cdEstabelecimento: 0,
            cdEquipamento: "",
            fgTipo: 0,
            cdDeposito: "",
            qtAlturaCaixa: 0,
            qtLarguraCaixa: 0,
            qtComprimentoCaixa: 0
        })
    }

    async function carregaProgramasPorId(id: string): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getProgramaById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            ProgramaReset(response.dados);
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
        return `Preencha os campos abaixo para ${!!id ? "editar" : "cadastrar"} um novo Programa `;
    }

    return (
        <ModalLateral
            title={!!id ? "Editar Programa" : "Cadastrar Programa"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoPrograma}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="lg:grid-cols-2">
                <Formulario.InputNumber
                    name="cdPrograma"
                    label="Programa"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="lg:col-span-2"
                    control={ProgramaControl}
                    align="text-left"
                />
                <Formulario.InputNumber
                    name="cdDocumento"
                    label="Documento"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="lg:col-span-2"
                    control={ProgramaControl}
                    align="text-left"
                />
                <Formulario.InputNumber
                    name="cdFabrica"
                    label="Fábrica"
                    type="text"
                    disabled={salvandoPrograma}
                    opcional={false}
                    control={ProgramaControl}
                    align="text-left"
                />
                <Formulario.InputNumber
                    name="cdEstabelecimento"
                    label="Estabelecimento"
                    disabled={salvandoPrograma}
                    opcional={false}
                    control={ProgramaControl}
                    align="text-left"
                />
                <Formulario.InputNumber
                    name="cdEquipamento"
                    label="Equipamento"
                    disabled={salvandoPrograma}
                    opcional={false}
                    control={ProgramaControl}
                    align="text-left"
                />
                <Formulario.InputNumber
                    name="fgTipo"
                    label="Tipo"
                    disabled={salvandoPrograma}
                    opcional={false}
                    control={ProgramaControl}
                    align="text-left"
                />
                <Formulario.InputTexto
                    name="cdDeposito"
                    label="Depósito"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="lg:col-span-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputNumber
                    name="qtLarguraCaixa"
                    label="Largura caixa"
                    disabled={salvandoPrograma}
                    opcional={false}
                    control={ProgramaControl}
                    align="text-left"
                />
                <Formulario.InputNumber
                    name="qtComprimentoCaixa"
                    label="Comprimento caixa"
                    disabled={salvandoPrograma}
                    opcional={false}
                    control={ProgramaControl}
                    align="text-left"
                />
                <Formulario.InputNumber
                    name="qtAlturaCaixa"
                    label="Altura caixa"
                    disabled={salvandoPrograma}
                    opcional={false}
                    control={ProgramaControl}
                    align="text-left"
                />
                <Formulario.InputData
                    name="dtLiberacao"
                    label="Data liberação"
                    disabled={salvandoPrograma}
                    opcional={false}
                    control={ProgramaControl}
                />
            </Formulario>
        </ModalLateral>
    );
}