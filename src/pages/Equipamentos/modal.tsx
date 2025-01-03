import { useEffect, useState } from "react";

import Tabela from "../../components/Tabela";
import Modal from "../../components/Modal";
import Box from "../../components/Box";
import { CaixaPedido, FiltroCaixaPedido } from "../../types/caixa.d";
import { Pedido } from "../../types/pedido.d";
import { corStatusAreaArmazenagem } from "../../types/areaArmazenagem.d";
import useToastLoading from "../../hooks/useToastLoading";
import { getListCaixa } from "../../services/caixa";
import Loading from "../../components/Loading";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    agrupadorSelecionado: corStatusAreaArmazenagem | null;
};

export default function ModalAgrupador(props: Props) {
    const toast = useToastLoading();
    const { open, setOpen, agrupadorSelecionado } = props;
    const [loading, setLoading] = useState(false);
    const [caixas, setCaixas] = useState<Array<CaixaPedido>>([]);
    const [pedidos, setPedidos] = useState<Array<Pedido>>([]);

    useEffect(() => {
        if (agrupadorSelecionado != null) {
            carregarPedido()
        }
    }, [open]);

    async function carregarPedido(): Promise<void> {
        if (agrupadorSelecionado == null) { return; }

        const filtro = { idPallet: agrupadorSelecionado.pallet }
        const request = () => getListCaixa(filtro);

        setLoading(true);

        const response = await request();
        if (response.sucesso) {
            setCaixas(response.dados.caixas);
            setPedidos(response.dados.pedidos);
        } else {
            toast({ tipo: response.tipo, mensagem: response.mensagem });
        }

        setLoading(false);
    }

    if (loading) return <Loading />;

    return (
        <Modal open={open} setOpen={setOpen} widthClassName="w-8/12">
            <div className="flex flex-col items-start justify-start gap-4 w-full mb-8">
                <h1 className="text-3xl font-bold mb-1">Caracol</h1>
                <div className="grid grid-cols-3 w-full text-xl">
                    <p><span className="font-semibold">Código:</span>{agrupadorSelecionado?.codigo ?? ""}</p>
                    <p><span className="font-semibold">Posição:</span>({agrupadorSelecionado?.caracol ?? ""} , {agrupadorSelecionado?.gaiola ?? ""})</p>
                    <p><span className="font-semibold">Pallet:</span>{agrupadorSelecionado?.pallet ?? ""}</p>
                </div>
            </div>
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
                            {pedidos.map(pedido => (
                                <Tabela.Body.Linha key={pedido.idPedido}>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{pedido.codigoLote}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{pedido.box}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{pedido.codigoPedido}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{pedido.quantidadeCaixas}</Tabela.Body.Linha.Coluna>
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
                            {caixas.map(caixa => (
                                <Tabela.Body.Linha key={caixa.codigo}>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{caixa.codigo}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{caixa.produto}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{caixa.cor}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{caixa.gradeTamanho}</Tabela.Body.Linha.Coluna>
                                    <Tabela.Body.Linha.Coluna alignText="text-center">{caixa.pares}</Tabela.Body.Linha.Coluna>
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
