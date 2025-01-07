import { useForm } from "react-hook-form";
import Box, { BoxContainer } from "../../components/Box";
import Formulario from "../../components/Input";
import { useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate, useParams } from "react-router-dom";
import useToastLoading from "../../hooks/useToastLoading";
import { getTransportadoraById, postTransportadoras, putTransportadora } from "../../services/transportadora";
import { transportadoraCadastro, transportadoraForm } from "../../types/transportadora.d";
import Botao from "../../components/Button";

export default function FormTransportadora() {
    const { id } = useParams();

    const toast = useToastLoading();
    const navigate = useNavigate();

    const { handleSubmit, register, reset } = useForm<transportadoraForm>();

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

        const response = await getTransportadoraById(Number(id));

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

        toast({ mensagem: "Salvando Transportadora" });

        let dados: transportadoraCadastro;

        await handleSubmit((dadosForm) => dados = {
            ...dadosForm,
            transportadoraId: Number(id),
        })();

        const request = Number(id) > 0 ? () => putTransportadora(dados) : () => postTransportadoras(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: id ? "Transportadora alterado com Sucesso!" : "Transportadora cadastrado com sucesso!",
                tipo: response.tipo,
            });

            navigate("/transportadora");
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
                        <Box.Header.Content.Titulo>Transportadora</Box.Header.Content.Titulo>
                        <Box.Header.Content.Subtitulo>{!id ? "Cadastro de" : "Edição da"} Transportadora {!!id && `#${id}`}</Box.Header.Content.Subtitulo>
                    </Box.Header.Content>
                </Box.Header>

                <Formulario className="lg:grid-cols-3">
                    <Formulario.InputTexto
                        name="nmNomeEmpresa"
                        label="Nome Empresa"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        className="col-span-2"
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="nmNomeReduzido"
                        label="Nome Reduzido"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="nmEmail"
                        label="E-mail"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="nmContato"
                        label="Contato"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="cdLogin"
                        label="Login"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="cdCnpj"
                        label="CNJP"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="fgSequenciamento"
                        label="Sequenciamento"
                        type="text"
                        disabled={salvando}
                        className="col-span-2"
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="fgStatus"
                        label="Status"
                        type="number"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="qtdSequenciais"
                        label="Qtd Sequenciais"
                        type="number"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="emails"
                        label="E-mails"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />

                </Formulario>
            </Box>

            <Box>
                <Box.Header>
                    <Box.Header.Content>
                        <Box.Header.Content.Titulo>Dados de endereço</Box.Header.Content.Titulo>
                        <Box.Header.Content.Subtitulo>Informações sobre a localização da transportadora.</Box.Header.Content.Subtitulo>
                    </Box.Header.Content>
                </Box.Header>

                <Formulario className="lg:grid-cols-3">
                    <Formulario.InputTexto
                        name="nmCep"
                        label="CEP"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="nmUf"
                        label="UF"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="nmMunicipio"
                        label="Municipio"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="nmBairro"
                        label="Bairro"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        register={register}
                    />
                    <Formulario.InputTexto
                        name="nmLogradouro"
                        label="Logradouro"
                        type="text"
                        disabled={salvando}
                        opcional={false}
                        className="col-span-2"
                        register={register}
                    />
                </Formulario>
            </Box>

            <Box horizontal className="justify-end gap-4">
                <Botao
                    carregando={salvando}
                    onClick={() => navigate("/transportadora")}
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