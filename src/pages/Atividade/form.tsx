import { useForm } from "react-hook-form";
import Box, { BoxContainer } from "../../components/Box";
import Formulario from "../../components/Input";
import { useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate, useParams } from "react-router-dom";
import useToastLoading from "../../hooks/useToastLoading";
import { getAtividadeById, postAtividades, putAtividade } from "../../services/atividade";
import { atividadeCadastro, atividadeForm } from "../../types/atividade.d";
import Botao from "../../components/Button";
import SelectEquipamanto from "../../templates/selects/EquipamentoSelect";
import SelectSetorTrabalho from "../../templates/selects/SetorTrabalhoSelect";
import SelectAtividade from "../../templates/selects/AtividadeSelect";

export default function FormAtividade() {
    const { id } = useParams();
    const { control, handleSubmit, register, reset } = useForm<atividadeForm>();
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

    async function carregarDados() {
        setCarregandoPagina(true);

        toast({ mensagem: "Carregando dados para edição" });

        const response = await getAtividadeById(Number(id));

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

        toast({ mensagem: "Salvando Atividade" });

        let dados: atividadeCadastro;

        await handleSubmit((dadosForm) => dados = {
            ...dadosForm,
            atividadeId: Number(id),

        })();

        const request = Number(id) > 0 ? () => putAtividade(dados) : () => postAtividades(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Atividade alterado com Sucesso!" : "Atividade cadastrado com sucesso!",
                tipo: response.tipo,
            });

            navigate("/atividade");
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
                        <Box.Header.Content.Titulo>Atividade</Box.Header.Content.Titulo>
                        <Box.Header.Content.Subtitulo>{!!id ? "Cadastro de" : "Edição da"} Atividade {!!id && `#${id}`}</Box.Header.Content.Subtitulo>
                    </Box.Header.Content>
                </Box.Header>

                <Formulario className="lg:grid-cols-3">
                    <Formulario.InputTexto
                        name="nmAtividade"
                        label="Descrição"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        className="lg:col-span-1"
                        register={register}
                    />

                    <SelectEquipamanto>
                        <SelectEquipamanto.Single
                            control={control}
                            className=""
                            disabled={salvando}
                        />
                    </SelectEquipamanto>

                    <SelectSetorTrabalho>
                        <SelectSetorTrabalho.Single
                            control={control}
                            className=""
                            disabled={salvando}
                        />
                    </SelectSetorTrabalho>

                    <Formulario.InputNumber
                        name="fgPermiteRejeitar"
                        label="Permite rejeitar tarefa"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className=""
                        decimalPlaces={0}
                        align="text-left"
                    />

                    <SelectAtividade>
                        <SelectAtividade.Single
                            control={control}
                            className=""
                            disabled={salvando}
                            name="atividadeAnterior"
                            label="Atividade anterior"
                        />
                    </SelectAtividade>

                    <Formulario.InputNumber
                        name="fgTipoAtribuicaoAutomatica"
                        label="Atribuição automática"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className=""
                        decimalPlaces={0}
                        align="text-left"
                    />

                    <SelectAtividade>
                        <SelectAtividade.Single
                            control={control}
                            className=""
                            disabled={salvando}
                            name="atividadeRotinaValidacao"
                            label="Rotina validação"
                        />
                    </SelectAtividade>

                    <Formulario.InputNumber
                        name="fgEvitaConflitoEndereco"
                        label="Evita conflito de endereço"
                        control={control}
                        disabled={salvando}
                        opcional={false}
                        className=""
                        decimalPlaces={0}
                        align="text-left"
                    />

                    <Formulario.InputHorario
                        register={register}
                        name="duracao"
                        label="Duração"
                        disabled={salvando}
                        opcional={false}
                        className=""
                    />
                </Formulario>
            </Box>

            <Box horizontal className="justify-end gap-4">
                <Botao
                    carregando={salvando}
                    onClick={() => navigate("/atividade")}
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