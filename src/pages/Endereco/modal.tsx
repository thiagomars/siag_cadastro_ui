import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getEnderecoById, postEnderecos, putEndereco } from "../../services/endereco";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { enderecoCadastro, enderecoListagem } from "../../types/endereco.d";
import SelectRegiaoTrabalho from "../../templates/selects/RegiaoTrabalhoSelect";
import SelectSetorTrabalho from "../../templates/selects/SetorTrabalhoSelect";
import SelectTipoEndereco from "../../templates/selects/TipoEnderecoSelect";
import { FaBox } from "react-icons/fa6";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    enderecoSelecionado: enderecoListagem | null;
    setEnderecoSelecionado: React.Dispatch<React.SetStateAction<enderecoListagem | null>>;
    carregaEnderecos: Function;
}

export default function ModalEndereco(props: Props) {
    const { open, setOpen, enderecoSelecionado, setEnderecoSelecionado, carregaEnderecos } = props;

    const [id, setId] = useState(0);
    const [salvandoEndereco, setSalvandoEndereco] = useState<boolean>(false);
    const { register: EnderecoRegister, handleSubmit: EnderecoSubmit, reset: EnderecoReset, control: EnderecoControl } = useForm<enderecoCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (enderecoSelecionado != null) {
            carregaEnderecosPorId(enderecoSelecionado.enderecoId);
        }
    }, [enderecoSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoEndereco(true);
        toast({ mensagem: "Salvando Endereço" });

        let dados: enderecoCadastro;

        await EnderecoSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = id > 0 ? () => putEndereco(dados) : () => postEnderecos(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Endereço alterado com Sucesso!" : "Endereço cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaEnderecos();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoEndereco(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setEnderecoSelecionado(null);
        setId(0);
        EnderecoReset({
            nmEndereco: "",
            enderecoId: 0,
            fgStatus: 0,
            qtEstoqueMinimo: 0,
            qtEstqueMaximo: 0,
            regiaoTrabalhoId: 0,
            setorTrabalhoId: 0,
            tipoEnderecoId: 0,
            tpPreenchimento: 0
        })
    }

    async function carregaEnderecosPorId(id: number): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getEnderecoById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            EnderecoReset({
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
        return `Preencha os campos abaixo para ${id > 0 ? "editar" : "cadastrar"} um novo Endereço `;
    }

    return (
        <ModalLateral
            title={id > 0 ? "Editar Endereço" : "Cadastrar Endereço"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoEndereco}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="lg:grid-cols-2">
                <Formulario.InputTexto
                    name="nmEndereco"
                    label="Descrição"
                    type="text"
                    disabled={salvandoEndereco}
                    className="lg:col-span-2"
                    opcional={false}
                    register={EnderecoRegister}
                />

                <SelectRegiaoTrabalho>
                    <SelectRegiaoTrabalho.Single
                        control={EnderecoControl}
                        disabled={salvandoEndereco}
                        opcional={false}
                        className="lg:col-span-2"
                    />
                </SelectRegiaoTrabalho>

                <SelectSetorTrabalho>
                    <SelectSetorTrabalho.Single
                        control={EnderecoControl}
                        disabled={salvandoEndereco}
                        opcional={false}
                        className="lg:col-span-2"
                    />
                </SelectSetorTrabalho>

                <SelectTipoEndereco>
                    <SelectTipoEndereco.Single
                        control={EnderecoControl}
                        disabled={salvandoEndereco}
                        opcional={false}
                        className="lg:col-span-2"
                    />
                </SelectTipoEndereco>

                <Formulario.InputNumber
                    name="qtEstoqueMinimo"
                    label="Qtd. Estoque Mínimo"
                    disabled={salvandoEndereco}
                    opcional={false}
                    control={EnderecoControl}
                    decimalPlaces={0}
                    align="text-left"
                    icone={<FaBox />}
                />

                <Formulario.InputNumber
                    name="qtEstoqueMaximo"
                    label="Qtd. Estoque Máximo"
                    disabled={salvandoEndereco}
                    opcional={false}
                    control={EnderecoControl}
                    decimalPlaces={0}
                    align="text-left"
                    icone={<FaBox />}
                />

                <Formulario.InputNumber
                    name="fgStatus"
                    label="Status"
                    disabled={salvandoEndereco}
                    opcional={false}
                    control={EnderecoControl}
                    decimalPlaces={0}
                    className="lg:col-span-2"
                />
                
                <Formulario.InputNumber
                    name="tpPreenchimento"
                    label="Preenchimento"
                    disabled={salvandoEndereco}
                    opcional={false}
                    control={EnderecoControl}
                    decimalPlaces={0}
                    className="lg:col-span-2"
                />
            </Formulario>
        </ModalLateral>
    );
}