import { useState } from "react";
import { useForm } from 'react-hook-form';

import ModalAgrupador from "./modal";
import Loading from "../../components/Loading";
import Box, { BoxContainer } from "../../components/Box";
import Formulario from "../../components/Input";
import SelectSetor from "../../templates/selects/Setor";
import StatusAgrupador from "../../components/StatusAgrupador";

export function Equipamentos(): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [agrupador, setAgrupador] = useState<number | null>(null);
    const { control } = useForm();

    if (loading) return <Loading />;

    const agrupadores = [...Array(12).keys()].map(i => (
        <StatusAgrupador value={i} type="ocupado" handleOnClick={() => handleOpenModal(i)} isCard />
    ));

    function handleOpenModal(id: number) {
        setModal(true);
        setAgrupador(id);
    }

    return (
        <BoxContainer className="h-full">
            <Box>
                <Box.Header>
                    <Box.Header.Content>
                        <Box.Header.Content.Titulo>
                            Filtros
                        </Box.Header.Content.Titulo>
                    </Box.Header.Content>
                </Box.Header>
                <Formulario className="md:grid-cols-4">
                    <SelectSetor
                        control={control}
                        opcional={true}
                        className="col-span-1"
                        isFiltro
                        label="Setor de Trabalho"
                    />
                </Formulario>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-7 mt-8 mb-4 place-items-center">
                    <StatusAgrupador />
                    <StatusAgrupador value={0} type="livre" />
                    <StatusAgrupador value={0} type="reservado" />
                    <StatusAgrupador value={0} type="ocupado" />
                    <StatusAgrupador value={0} type="manutencao" />
                    <StatusAgrupador value={10} type="bloqueado" />
                    <StatusAgrupador value={0} type="desabilitado" />
                </div>
            </Box>
            <Box className="flex justify-center h-[30rem]">
                <div className="grid grid-cols-4 lg:grid-cols-12 place-items-center gap-4 h-64">
                    {agrupadores}
                </div>
            </Box>
            <ModalAgrupador open={modal} setOpen={setModal} agrupadorSelecionado={agrupador} />
        </BoxContainer>
    );
}
