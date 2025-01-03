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
    const { register: ProgramaRegister, handleSubmit: ProgramaSubmit, reset: ProgramaReset } = useForm<ProgramaCadastro>();
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

        await ProgramaSubmit((dadosForm) => dados = { ...dadosForm })();

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
            <Formulario className="col-span-2 grid grid-cols-2">
                <Formulario.InputTexto
                    name="cdPrograma"
                    label="Programa"
                    type="number"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputTexto
                    name="cdDocumento"
                    label="Documento"
                    type="number"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputTexto
                    name="cdFabrica"
                    label="Fábrica"
                    type="text"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputTexto
                    name="cdEstabelecimento"
                    label="Estabelecimento"
                    type="number"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputTexto
                    name="cdEquipamento"
                    label="Equipamento"
                    type="number"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputTexto
                    name="fgTipo"
                    label="Tipo"
                    type="number"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputTexto
                    name="cdDeposito"
                    label="Depósito"
                    type="text"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputTexto
                    name="qtAlturaCaixa"
                    label="Altura caixa"
                    type="number"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputTexto
                    name="qtLarguraCaixa"
                    label="Largura caixa"
                    type="number"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputTexto
                    name="qtComprimentoCaixa"
                    label="Comprimento caixa"
                    type="number"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />
                <Formulario.InputTexto
                    name="dtLiberacao"
                    label="Data liberação"
                    type="date"
                    disabled={salvandoPrograma}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={ProgramaRegister}
                />

            </Formulario>
        </ModalLateral>
    );
}