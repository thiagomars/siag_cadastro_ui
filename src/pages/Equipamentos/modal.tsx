import { useEffect } from "react";

import Tabela from "../../components/Tabela";
import Modal from "../../components/Modal";
import Box from "../../components/Box";
import ScrollArea from '../../components/ScrollArea';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    agrupadorSelecionado: number | null;
};

export default function ModalAgrupador(props: Props) {
    const {
        open,
        setOpen,
        agrupadorSelecionado,
    } = props;

    useEffect(() => {
        if (agrupadorSelecionado != null) {
            carregaAgrupadorPorId(agrupadorSelecionado);
        }

    }, [open]);

    async function carregaAgrupadorPorId(id: number): Promise<void> {
        // const response = await getAgrupadorById(id);

        // if (response.sucesso) {

        // } else {
        //     toast({
        //         mensagem: response.mensagem,
        //         tipo: response.tipo,
        //         isLoading: false,
        //     });
        // }
    }

    return (
        <Modal open={open} setOpen={setOpen} widthClassName="w-8/12">
            <div className="grid grid-cols-3 gap-8">
                <Box className="col-span-1 max-h-96 border p-0">
                    <Tabela titulo="">
                        <Tabela.Header>
                            <Tabela.Header.Coluna alignText="text-center">Lote</Tabela.Header.Coluna>
                            <Tabela.Header.Coluna alignText="text-center">Box</Tabela.Header.Coluna>
                            <Tabela.Header.Coluna alignText="text-center">Pedido</Tabela.Header.Coluna>
                            <Tabela.Header.Coluna alignText="text-center">Qtd. Caixas</Tabela.Header.Coluna>
                        </Tabela.Header>
                        <Tabela.Body>
                            {[...Array(1).keys()].map(value => (
                                <Tabela.Body.Linha key={value}>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">Value 1</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">Value 2</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">Value 3</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">Value 3</Tabela.Body.Linha.Coluna>
                                </Tabela.Body.Linha>
                            ))}
                        </Tabela.Body>
                    </Tabela>
                </Box>
                <Box className="col-span-2 max-h-96 border p-0">
                    <Tabela titulo=''>
                        <Tabela.Header>
                            <Tabela.Header.Coluna alignText="text-center">Caixa</Tabela.Header.Coluna>
                            <Tabela.Header.Coluna alignText="text-center">Prod</Tabela.Header.Coluna>
                            <Tabela.Header.Coluna alignText="text-center">Cor</Tabela.Header.Coluna>
                            <Tabela.Header.Coluna alignText="text-center">Tm/Gr</Tabela.Header.Coluna>
                            <Tabela.Header.Coluna alignText="text-center">Pares</Tabela.Header.Coluna>
                        </Tabela.Header>
                        <Tabela.Body>
                            {[...Array(20).keys()].map(value => (
                                <Tabela.Body.Linha key={value}>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{value}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{value}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{value}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{value}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{value}</Tabela.Body.Linha.Coluna>
                                </Tabela.Body.Linha>
                            ))}
                        </Tabela.Body>
                    </Tabela>
                </Box>
            </div>
            <Modal.ContainerBotoes>
                <Modal.BotaoCancelar texto="Sair" />
            </Modal.ContainerBotoes>
        </Modal>
    );
}
