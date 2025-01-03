import { useForm } from "react-hook-form";
import Box, { BoxContainer } from "../../components/Box";
import Formulario from "../../components/Input";
import { useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate, useParams } from "react-router-dom";
import SelectAgrupador from "../../templates/selects/AgrupadorSelect";
import useToastLoading from "../../hooks/useToastLoading";
import { getCaixaById, postCaixas, putCaixa } from "../../services/caixa";
import { caixaCadastro, caixaForm } from "../../types/caixa.d";
import SelectPallet from "../../templates/selects/PalletSelect";
import Botao from "../../components/Button";
import SelectPrograma from "../../templates/selects/ProgramaSelect";
import SelectPedido from "../../templates/selects/PedidoSelect";

export default function FormCaixa() {
    const { id } = useParams();
    const { control, handleSubmit, register, reset, watch, setValue} = useForm<caixaForm>();
    const hookWatch = watch();
    const toast = useToastLoading();
    const navigate = useNavigate();
    
    const [carregandoPagina, setCarregandoPagina] = useState<boolean>(true);
    const [salvando, setSalvando] = useState<boolean>(false);

    useEffect(() => {
        if (!!id)
            debounceCarregarDados();
        else
            setCarregandoPagina(false);
    }, []);

    // useEffect(() => {
    //     const subscription = watch((values, alterField) => {
    //         if (alterField.name == "cor")
    //             setValue("cdCor", values.cor);
    //     });
        
    //     return () => subscription.unsubscribe();
    // }, [hookWatch]);

    async function carregarDados() {
        setCarregandoPagina(true);

        toast({ mensagem: "Carregando dados para edição" });
        
        const response = await getCaixaById(Number(id));
        
        if (response.sucesso) {
            toast({ tipo: "dismiss" });
            reset({
                ...response.dados
            })
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo,
                isLoading: false
            });
        }
        
        setCarregandoPagina(false);
    }

    const debounceCarregarDados = useDebounce(carregarDados, 500);

    async function handleSalvar() {
        setSalvando(true);

        toast({ mensagem: "Salvando Caixa" });

        let dados: caixaCadastro;

        await handleSubmit((dadosForm) => dados = {
            ...dadosForm,
            caixaId: Number(id),

        })();

        const request = Number(id) > 0 ? () => putCaixa(dados) : () => postCaixas(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Depósito alterado com Sucesso!" : "Depósito cadastrado com sucesso!",
                tipo: response.tipo,
            });

            navigate("/caixa");
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvando(false);
    }

    if (carregandoPagina)
        return <LoadingPage />

    return (
        <BoxContainer>
            <Box>
                <Box.Header>
                    <Box.Header.Content>
                        <Box.Header.Content.Titulo>Caixa</Box.Header.Content.Titulo>
                        <Box.Header.Content.Subtitulo>{!!id ? "Cadastro de" : "Edição de"} Caixa {!!id && `#${id}`}</Box.Header.Content.Subtitulo>
                    </Box.Header.Content>
                </Box.Header>
                
                <Formulario className="lg:grid-cols-3">
                    <SelectAgrupador>
                        <SelectAgrupador.Single
                            control={control}
                            className=""
                            disabled={salvando}
                        />
                    </SelectAgrupador>

                    <SelectPallet>
                        <SelectPallet.Single
                            control={control}
                            className=""
                            disabled={salvando}
                        />
                    </SelectPallet>

                    <SelectPrograma>
                        <SelectPrograma.Single
                            control={control}
                            className=""
                            disabled={salvando}
                        />
                    </SelectPrograma>

                    <SelectPedido>
                        <SelectPedido.Single
                            control={control}
                            className=""
                            disabled={salvando}
                        />
                    </SelectPedido>

                    <Formulario.InputTexto
                        name="cdProduto"
                        label="Código Produto"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        className="lg:col-span-1"
                        register={register}
                    />

                    <Formulario.InputCor
                        name="cdCor"
                        label="Cor"
                        register={register}
                        control={control}
                        opcional={false}
                        value={watch("cdCor")}
                        disabled={salvando}
                    />
                    
                    <Formulario.InputTexto
                        name="cdGrudeTamanho"
                        label="Tamanho grude"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        className=""
                        register={register}
                    />

                    <Formulario.InputNumber
                        name="nrCaixa"
                        label="Nº da caixa"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className=""
                        decimalPlaces={0}
                        align="text-left"
                    />

                    <Formulario.InputNumber
                        name="fgStatus"
                        label="Status"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className=""
                        decimalPlaces={0}
                        align="text-left"
                    />

                    <Formulario.InputData
                        name="dtEmbalagem"
                        label="Embalagem"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className=""
                    />

                    <Formulario.InputData
                        name="dtSorter"
                        label="Sorter"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className=""
                    />

                    <Formulario.InputData
                        name="dtEstufamento"
                        label="Estufamento"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className=""
                    />

                    <Formulario.InputData
                        name="dtExpedicao"
                        label="Expedição"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className=""
                    />

                    <Formulario.InputNumber
                        name="qtPeso"
                        label="Peso"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className=""
                        decimalPlaces={2}
                        align="text-left"
                    />

                    <Formulario.InputCheckBox
                        name="fgRfid"
                        label="RFID"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className="lg:mb-1.5"
                    />
                </Formulario>
            </Box>

            <Box horizontal className="justify-end gap-4">
                <Botao
                    carregando={salvando}
                    onClick={() => navigate("/caixa")}
                    texto="Cancelar"
                    className="w-fit"
                    tipo="padrao"
                />
                <Botao
                    carregando={salvando}
                    onClick={() => handleSalvar()}
                    texto={"Salvar"}
                    className="w-fit"
                    tipo="sucesso"
                />
            </Box>
        </BoxContainer>
    )
}