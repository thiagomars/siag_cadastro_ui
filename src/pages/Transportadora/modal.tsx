import { useEffect, useState } from "react";
import Formulario from "../../components/Input";

import { useForm } from "react-hook-form";
import ModalLateral from "../../components/ModalLateral";
import useToastLoading from "../../hooks/useToastLoading";
import { getTransportadoraById, postTransportadoras, putTransportadora } from "../../services/transportadora";
import { baseAlteracoes } from "../../types/baseEntity.d";
import { TransportadoraCadastro, TransportadoraListagem } from "../../types/transportadora.d";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    TransportadoraSelecionado: TransportadoraListagem | null;
    setTransportadoraSelecionado: React.Dispatch<React.SetStateAction<TransportadoraListagem | null>>;
    carregaTransportadoras: Function;
}

export default function ModalTransportadora(props: Props) {
    const { open, setOpen, TransportadoraSelecionado, setTransportadoraSelecionado, carregaTransportadoras } = props;

    const [id, setId] = useState("");
    const [salvandoTransportadora, setSalvandoTransportadora] = useState<boolean>(false);
    const { register: TransportadoraRegister, handleSubmit: TransportadoraSubmit, reset: TransportadoraReset } = useForm<TransportadoraCadastro>();
    const toast = useToastLoading();
    const [alteracoes, setAlteracoes] = useState<baseAlteracoes | null>();

    useEffect(() => {
        if (TransportadoraSelecionado != null) {
            carregaTransportadorasPorId(TransportadoraSelecionado.transportadoraId.toString());
        }
    }, [TransportadoraSelecionado]);

    useEffect(() => {
        if (!open) {
            limparCampos();
        }

        return () => {
            limparCampos();
        };
    }, [open]);

    async function handleSalvar(): Promise<void> {
        setSalvandoTransportadora(true);
        toast({ mensagem: "Salvando Transportadora" });

        let dados: TransportadoraCadastro;

        await TransportadoraSubmit((dadosForm) => dados = { ...dadosForm })();

        const request = !!id ? () => putTransportadora(dados) : () => postTransportadoras(dados);

        const response = await request();

        if (response.sucesso) {
            toast({
                mensagem: !!id ? "Transportadora alterada com Sucesso!" : "Transportadora cadastrada com sucesso!",
                tipo: response.tipo,
            });

            carregaTransportadoras();
        } else {
            toast({
                mensagem: response.mensagem,
                tipo: response.tipo
            });
        }

        setSalvandoTransportadora(false);
    }

    const limparCampos: Function = (): void => {
        setAlteracoes(null);
        setTransportadoraSelecionado(null);
        setId("");
        TransportadoraReset({
            nmNomeEmpresa : "",
            nmNomeReduzido: "",
            nmLogradouro: "",
            nmBairro: "",
            nmCep: "",
            nmUf: "",
            nmMunicipio: "",
            nmEmail: "",
            nmContato: "",
            cdCnpj: "",
            cdLogin: ""
        })
    }

    async function carregaTransportadorasPorId(id: string): Promise<void> {
        if (open)
            toast({ mensagem: "Carregando dados para edição" });

        const response = await getTransportadoraById(id);

        if (response.sucesso) {
            setId(id);
            const { ...baseAlteracoes }: baseAlteracoes = response.dados;
            setAlteracoes({ ...baseAlteracoes });
            toast({ tipo: 'dismiss' });
            TransportadoraReset(response.dados);
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
        return `Preencha os campos abaixo para ${!!id ? "editar" : "cadastrar"} uma nova Transportadora `;
    }

    return (
        <ModalLateral
            title={!!id ? "Editar Transportadora" : "Cadastrar Transportadora"}
            subtitle={getSubtitulo()}
            onClose={handleCloseModal}
            onSave={handleSalvar}
            saving={salvandoTransportadora}
            open={open}
            id={id}
            {...(alteracoes as baseAlteracoes)}
        >
            <Formulario className="col-span-2 grid grid-cols-2">
                <Formulario.InputTexto
                    name="nmNomeEmpresa"
                    label="Nome Empresa"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="nmNomeReduzido"
                    label="Nome Reduzido"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="nmLogradouro"
                    label="Logradouro"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="nmBairro"
                    label="Bairro"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="nmCep"
                    label="CEP"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="nmUf"
                    label="UF"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="nmMunicipio"
                    label="Municipio"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="nmEmail"
                    label="E-mail"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="nmContato"
                    label="Contato"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="cdLogin"
                    label="Login"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="cdCnpj"
                    label="CNJP"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="fgSequenciamento"
                    label="Sequenciamento"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="fgStatus"
                    label="Status"
                    type="number"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="qtdSequenciais"
                    label="Qtd Sequenciais"
                    type="number"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />
                <Formulario.InputTexto
                    name="emails"
                    label="E-mails"
                    type="text"
                    disabled={salvandoTransportadora}
                    opcional={false}
                    className="col-span-2 mb-2"
                    register={TransportadoraRegister}
                />

            </Formulario>
        </ModalLateral>
    );
}