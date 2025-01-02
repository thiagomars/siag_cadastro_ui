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
    const { register: TurnoRegister, handleSubmit: TurnoSubmit, reset: TurnoReset } = useForm<TurnoCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (TurnoSelecionado != null) {
            carregaTurnosPorId(TurnoSelecionado.id_turno.toString());
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

        await TurnoSubmit((dadosForm) => dados = { ...dadosForm })();

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
            cd_turno: ""

        })
    }

    async function carregaTurnosPorId(id: string): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getTurnoById(id.toString());

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
                <Formulario.InputTexto
                    name="cd_turno"
                    label="Turno"
                    type="text"
                    disabled={salvandoTurno}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TurnoRegister}
                />
                <Formulario.InputTexto
                    name="dt_inicio"
                    label="Data início"
                    type="date"
                    disabled={salvandoTurno}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TurnoRegister}
                />
                <Formulario.InputTexto
                    name="dt_fim"
                    label="Data fim"
                    type="date"
                    disabled={salvandoTurno}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TurnoRegister}
                />

            </Formulario>
        </ModalLateral>
    );
}