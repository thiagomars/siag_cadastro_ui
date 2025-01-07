import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getPalletById, postPallets, putPallet } from "../../services/pallet";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { palletCadastro, palletListagem } from "../../types/pallet.d";
import SelectAreaArmazenagem from "../../templates/selects/AreaArmazenagemSelect";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    palletSelecionado: palletListagem | null;
    setPalletSelecionado: React.Dispatch<React.SetStateAction<palletListagem | null>>;
    carregaPallets: Function;
}

export default function ModalPallet(props: Props) {
    const { open, setOpen, palletSelecionado, setPalletSelecionado, carregaPallets } = props;

    const [id, setId] = useState(0);
    const [salvandoPallet, setSalvandoPallet] = useState<boolean>(false);
    const { register: PalletRegister, handleSubmit: PalletSubmit, reset: PalletReset, control: PalletControl } = useForm<palletCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (palletSelecionado != null) {
            carregaPalletsPorId(palletSelecionado.id_pallet);
        }
    }, [palletSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoPallet(true);
        toast({ mensagem: "Salvando Pallet" });

        let dados: palletCadastro;

        await PalletSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = id > 0 ? () => putPallet(dados) : () => postPallets(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Pallet alterado com Sucesso!" : "Pallet cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaPallets();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoPallet(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setPalletSelecionado(null);
        setId(0);
        PalletReset({
            cd_identificacao: "",
            dt_ultimamovimentacao: "",
            fg_status: "",
            id_agrupador: 0,
            id_areaarmazenagem: 0,
            id_pallet: 0,
            qt_utilizacao: 0
        })
    }

    async function carregaPalletsPorId(id: number): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getPalletById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            PalletReset(response.dados);
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
        return `Preencha os campos abaixo para ${id > 0 ? "editar" : "cadastrar"} um novo Pallet `;
    }

    return (
        <ModalLateral
            title={id > 0 ? "Editar Pallet" : "Cadastrar Pallet"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoPallet}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario>
                <SelectAreaArmazenagem>
                    <SelectAreaArmazenagem.Single
                        control={PalletControl}
                        disabled={salvandoPallet}
                        opcional={false}
                    />
                </SelectAreaArmazenagem>

                <Formulario.InputTexto
                    name="nm_pallet"
                    label="Pallet"
                    type="text"
                    disabled={salvandoPallet}
                    opcional={false}
                    className="col-span-2"
                    register={PalletRegister}
                />
                <Formulario.InputTexto
                    name="nm_nomepallet"
                    label="Nome Pallet"
                    type="text"
                    disabled={salvandoPallet}
                    opcional={false}
                    className="col-span-2"
                    register={PalletRegister}
                />

            </Formulario>
        </ModalLateral>
    );
}