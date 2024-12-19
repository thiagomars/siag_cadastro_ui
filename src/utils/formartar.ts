import Decimal from "decimal.js";

export const formatarTelefone = (telefone: string): string => {
    if (!!!telefone) return "";
    var r = telefone?.replace(/\D/g, "");
    r = r?.replace(/^0/, "");
    if (r.length > 10) {
        r = r?.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r?.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r?.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r?.replace(/^(\d*)/, "($1");
    }
    return r;
}

export const formatarCpf = (cpf: string, mensagemInvalido?: boolean): string => {
    
    if (!cpf)
        return "Não informado"

    if (cpf.length != 11 && mensagemInvalido)
        return `${cpf} (CPF Inválido)`

    var r = cpf?.replace(/\D/g, "");
    r = r?.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");

    return r;
}

export const formatarCnpj = (cnpj: string): string => {
    if (!cnpj)
        return "Não informado"

    if (cnpj.length != 14)
        return `${cnpj} (CNPJ Inválido)`

    var r = cnpj?.replace(/\D/g, "");

    r = r?.replace(/(\d{2})(\d)/, '$1.$2')
    r = r?.replace(/(\d{3})(\d)/, '$1.$2')
    r = r?.replace(/(\d{3})(\d)/, '$1/$2')
    r = r?.replace(/(\d{4})(\d)/, '$1-$2')
    r = r?.replace(/(-\d{2})\d+?$/, '$1')

    return r;
}

export const formatarCep = (cep: string): string => {
    var r = cep?.replace(/\D/g, "");
    r = r?.replace(/^(\d{5})(\d{3}).*/, "$1-$2");

    return r;
}

export const removeMascara = (item?: string): string => {
    return item === undefined ? "" : item?.replace(/[^0-9]/g, "")
}

export const brlCurrencyStringToNumber = (value: number): number => {
    return value ? Number(value?.toString()?.replace(",", ".")) : 0;
}

export const formatarDinheiro = (valor: string | number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(converterDecimal(valor)));
}

export const formatarDecimal = (valor: string | number, decimalPlaces: number = 2): string => {
    if (valor === 0)
        return "0";

    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: decimalPlaces }).format(Number(converterDecimal(valor, decimalPlaces)));
}

export const converterDecimal = (valor: string | number, decimalPlaces: number = 2) => {
    return new Decimal(valor).toDecimalPlaces(decimalPlaces, Decimal.ROUND_UP).toString();
}

export const formatarPlaca = (placa: string): string => {
    if (!!!placa) return "";

    var r = placa?.replace(/\W/g, "");
    r = r?.replace(/([A-Z]{3})(\d+)/, "$1-$2");

    return r;
}

export const formatarNCM = (ncm: string | number) => {
    return ncm.toString()?.replace(/^(\d{4})(\d{2})(\d{2}).*/, "$1.$2.$3");
}

export const formatarEndereco = (uf: string | null, municipio: string | null, bairro: string | null, rua: string | null, numero: string | number | null) => {
    let endereco = rua || "";

    endereco += bairro ? `${rua && ", "}${bairro}` : "";
    endereco += numero ? `${(bairro || rua) && ", "}${numero}` : "";
    endereco += municipio ? `${(numero || bairro || rua) && ", "}${municipio}` : "";
    endereco += uf ? `${(municipio || numero || bairro || rua) && "/"}${uf}` : "";

    return endereco || "Não informado";
}

export const formatarNumeroBrl = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR').format(valor);
}