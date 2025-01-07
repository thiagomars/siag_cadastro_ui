import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getTurnoById, postTurnos, putTurno } from "../../services/turno";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { TurnoCadastro, TurnoListagem } from "../../types/turno.d";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    TurnoSelecionado: TurnoListagem | null;
    setTurnoSelecionado: React.Dispatch<React.SetStateAction<TurnoListagem | null>>;
    carregaTurnos: Function;
}

export default function ModalTurno(props: Props) {
    const { open, setOpen, TurnoSelecionado, setTurnoSelecionado, carregaTurnos } = props;

    const [id, setId] = useState("");
    const [salvandoTurno, setSalvandoTurno] = useState<boolean>(false);
    const { handleSubmit: TurnoSubmit, reset: TurnoReset, control: TurnoControl, getValues } = useForm<TurnoCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (TurnoSelecionado != null) {
            carregaTurnosPorId(TurnoSelecionado.turnoId.toString());
        }
    }, [TurnoSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoTurno(true);
        toast({ mensagem: "Salvando Turno" });

        let dados: TurnoCadastro;

        await TurnoSubmit((dadosForm) => dados = {
            ...dadosForm,
            ...getValues()
        })();

        const request = !!id ? () => putTurno(dados) : () => postTurnos(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: !!id ? "Turno alterado com Sucesso!" : "Turno cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaTurnos();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoTurno(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setTurnoSelecionado(null);
        setId("");
        TurnoReset({
            cdTurno: ""

        })
    }

    async function carregaTurnosPorId(id: string): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getTurnoById(Number(id));

        if (response.sucesso) {
            setId(id.toString());
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            TurnoReset(response.dados);
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
        return `Preencha os campos abaixo para ${!!id ? "editar" : "cadastrar"} um novo Turno `;
    }

    return (
        <ModalLateral
            title={!!id ? "Editar Turno" : "Cadastrar Turno"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoTurno}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="col-span-2 grid grid-cols-2">
                <Formulario.InputNumber
                    name="cdTurno"
                    label="Turno"
                    disabled={salvandoTurno}
                    opcional={false}
                    className="col-span-2"
                    control={TurnoControl}
                    align="text-left"
                />
                <Formulario.InputHorario
                    name="dtInicio"
                    label="Data início"
                    type="date"
                    disabled={salvandoTurno}
                    opcional={false}
                    className="col-span-2"
                    control={TurnoControl}
                />
                <Formulario.InputHorario
                    name="dtFim"
                    label="Data fim"
                    type="date"
                    disabled={salvandoTurno}
                    opcional={false}
                    className="col-span-2 mb-2"
                    control={TurnoControl}
                />
                <Formulario.InputCheckBox
                    name="diaAnterior"
                    label="Dia anterior"
                    type="checkbox"
                    disabled={salvandoTurno}
                    opcional={false}
                    className="col-span-2"
                    control={TurnoControl}
                />
                <Formulario.InputCheckBox
                    name="diaSucessor"
                    label="Dia sucessor"
                    type="checkbox"
                    disabled={salvandoTurno}
                    opcional={false}
                    className="col-span-2"
                    control={TurnoControl}
                />

            </Formulario>
        </ModalLateral>
    );
}