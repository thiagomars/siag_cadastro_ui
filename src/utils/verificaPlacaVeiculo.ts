export default function verificaPlacaVeiculoValida(placa: string): boolean {
    if ((/^[A-Z]{0,3}$/).test(placa))
        return true;

    if ((/^[A-Z]{3}-\d{0,1}$/).test(placa))
        return true;

    if ((/^[A-Z]{3}-\d{1}[A-Z0-9]{0,1}$/).test(placa))
        return true;

    if ((/^[A-Z]{3}-\d{1}[A-Z0-9]{1}\d{0,2}$/).test(placa))
        return true;

    return false;
}