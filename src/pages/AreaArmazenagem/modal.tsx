import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getAreaArmazenagemById, postAreaArmazenagems, putAreaArmazenagem } from "../../services/areaArmazenagem";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { areaArmazenagemCadastro, areaArmazenagemListagem } from "../../types/areaArmazenagem.d";
import { FaBuffer } from "react-icons/fa6";
import SelectTipoArea from "../../templates/selects/TipoAreaSelect";
import SelectEndereco from "../../templates/selects/EnderecoSelect";
import SelectAgrupador from "../../templates/selects/AgrupadorSelect";
import SelectStatusAreaArmazenagem from "../../templates/selects/StatusAreaArmazenagemSelect";
import { typeSelectOptions } from "../../types/select.d";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    areaArmazenagemSelecionado: areaArmazenagemListagem | null;
    setAreaArmazenagemSelecionado: React.Dispatch<React.SetStateAction<areaArmazenagemListagem | null>>;
    carregaAreaArmazenagems: Function;
}

export default function ModalAreaArmazenagem(props: Props) {
    const { open, setOpen, areaArmazenagemSelecionado, setAreaArmazenagemSelecionado, carregaAreaArmazenagems } = props;

    const [id, setId] = useState(0);
    const [salvandoAreaArmazenagem, setSalvandoAreaArmazenagem] = useState<boolean>(false);
    const { register: AreaArmazenagemRegister, handleSubmit: AreaArmazenagemSubmit, reset: AreaArmazenagemReset, control: AreaArmazenagemControl } = useForm<areaArmazenagemCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (areaArmazenagemSelecionado != null) {
            carregaAreaArmazenagemsPorId(areaArmazenagemSelecionado.areaArmazenagemId);
        }
    }, [areaArmazenagemSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoAreaArmazenagem(true);
        toast({ mensagem: "Salvando Área de Armazenagem" });

        let dados: areaArmazenagemCadastro;

        await AreaArmazenagemSubmit((dadosForm) => dados = {
            ...dadosForm,
            fgStatus: (dadosForm.fgStatus as typeSelectOptions)?.value,
        })();

        const request = id > 0 ? () => putAreaArmazenagem(dados) : () => postAreaArmazenagems(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Área de Armazenagem alterado com Sucesso!" : "Área de Armazenagem cadastrado com sucesso!",
                tipo: response.tipo,
            });

            carregaAreaArmazenagems();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoAreaArmazenagem(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setAreaArmazenagemSelecionado(null);
        setId(0);
        AreaArmazenagemReset({
            agrupadorId: 0,
            agrupadorReservadoId: 0,
            areaArmazenagemId: 0,
            cdIdentificacao: "",
            enderecoId: 0,
            fgStatus: { },
            nrLado: 0,
            nrPosicaoX: 0,
            nrPosicaoY: 0,
            tipoAreaId: 0
        })
    }

    async function carregaAreaArmazenagemsPorId(id: number): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getAreaArmazenagemById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            AreaArmazenagemReset({
                ...response.dados,
                areaArmazenagem: {
                    value: response.dados?.areaArmazenagem?.areaArmazenagemId,
                    label: response.dados?.areaArmazenagem?.areaArmazenagemId + " - " + response.dados?.areaArmazenagem?.nmAreaArmazenagem
                },
                agrupador: {
                    value: response.dados?.agrupadorAtivo?.agrupadorId,
                    label: "Agrupamento: " + response.dados?.agrupadorAtivo?.tpAgrupamento + " - Sequência: " + response.dados?.agrupadorAtivo?.cdSequencia
                },
                agrupadorReservado: {
                    value: response.dados?.agrupadorReservado?.agrupadorId,
                    label: "Agrupamento: " + response.dados?.agrupadorReservado?.tpAgrupamento + " - Sequência: " + response.dados?.agrupadorReservado?.cdSequencia
                },
                endereco: {
                    value: response.dados?.endereco?.enderecoId,
                    label: response.dados?.endereco?.enderecoId + " - " + response.dados?.endereco?.nmEndereco
                },
                fgStatus: {
                    value: response.dados?.fgStatus?.id,
                    label: response.dados?.fgStatus?.descricao
                },
                tipoArea: {
                    value: response.dados?.tipoArea?.tipoAreaId,
                    label: response.dados?.tipoArea?.nmTipoArea
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
        return `Preencha os campos abaixo para ${id > 0 ? "editar" : "cadastrar"} um novo Área de Armazenagem `;
    }

    return (
        <ModalLateral
            title={id > 0 ? "Editar Área de Armazenagem" : "Cadastrar Área de Armazenagem"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoAreaArmazenagem}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="lg:grid-cols-2">
                <SelectTipoArea>
                    <SelectTipoArea.Single
                        control={AreaArmazenagemControl}
                        disabled={salvandoAreaArmazenagem}
                        opcional={false}
                        className="lg:col-span-2"
                    />
                </SelectTipoArea>

                <SelectEndereco>
                    <SelectEndereco.Single
                        control={AreaArmazenagemControl}
                        disabled={salvandoAreaArmazenagem}
                        opcional={false}
                        className="lg:col-span-2"
                    />
                </SelectEndereco>

                <SelectAgrupador>
                    <SelectAgrupador.Single
                        control={AreaArmazenagemControl}
                        disabled={salvandoAreaArmazenagem}
                        opcional={false}
                        className="lg:col-span-2"
                        name="agrupador"
                        label="Agrupador ativo"
                    />
                </SelectAgrupador>

                <Formulario.InputNumber
                    name="nrPosicaoX"
                    label="Posição X"
                    disabled={salvandoAreaArmazenagem}
                    opcional={false}
                    control={AreaArmazenagemControl}
                    decimalPlaces={0}
                    align="text-left"
                    className="lg:col-span-1"
                    icone={<FaBuffer className="fill-gray-600" />}
                />

                <Formulario.InputNumber
                    name="nrPosicaoY"
                    label="Posição Y"
                    disabled={salvandoAreaArmazenagem}
                    opcional={false}
                    control={AreaArmazenagemControl}
                    decimalPlaces={0}
                    align="text-left"
                    className="lg:col-span-1"
                    icone={<FaBuffer className="fill-gray-600" />}
                />

                <Formulario.InputNumber
                    name="nrLado"
                    label="Lado"
                    disabled={salvandoAreaArmazenagem}
                    opcional={false}
                    control={AreaArmazenagemControl}
                    decimalPlaces={0}
                    align="text-left"
                    className="lg:col-span-2"
                    icone={<FaBuffer className="fill-gray-600" />}
                />

                <SelectStatusAreaArmazenagem>
                    <SelectStatusAreaArmazenagem.Single
                        name="fgStatus"
                        control={AreaArmazenagemControl}
                        disabled={salvandoAreaArmazenagem}
                        opcional={false}
                        className="lg:col-span-2"
                    />
                </SelectStatusAreaArmazenagem>

                <Formulario.InputTexto
                    name="cdIdentificacao"
                    label="Identificação"
                    type="text"
                    disabled={salvandoAreaArmazenagem}
                    className="lg:col-span-2"
                    opcional={false}
                    register={AreaArmazenagemRegister}
                />

                <SelectAgrupador>
                    <SelectAgrupador.Single
                        name="agrupadorReservado"
                        control={AreaArmazenagemControl}
                        disabled={salvandoAreaArmazenagem}
                        opcional={false}
                        className="lg:col-span-2"
                        label="Agrupador reservado"
                    />
                </SelectAgrupador>
            </Formulario>
        </ModalLateral>
    );
}