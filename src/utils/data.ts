import moment from "moment";

export const inicioDia = (data: string | Date | null | undefined): string | Date | null | undefined => {
    try {
        if (!data)
            throw "";
        return moment(data).utc().startOf('day').toISOString();
    } catch (error) {
        return data;
    }
}

export const fimDia = (data: string | Date | null | undefined): string | Date | null | undefined => {
    try {
        if (!data)
            throw "";

        return moment(data).utc().endOf("day").toISOString();
    } catch (error) {
        return data;
    }
}

export const formatarData = (data: Date | string, tipo: "" | "data" | "hora" = "", segundos: boolean = false): string => { // "data", "hora"
    if (tipo == "data")
        return moment(data).format('DD/MM/YYYY');
    if (tipo == "hora")
        return segundos ? moment(data).format('HH:mm:ss') : moment(data).format('HH:mm');

    return segundos ? moment(data).format('DD/MM/YYYY HH:mm:ss') : moment(data).format('DD/MM/YYYY HH:mm');
}

export const formatarHorarioApi = (horario: Date | string): string => {
    if (!horario) return "";
    return moment(horario).format('YYYY-MM-DDTHH:mm:ss');
}

export const juntarDataHora = (data: Date | string, hora: Date | string): string => {
    let auxHorario = moment(hora).format("HH:mm:ss");
    let auxData = moment(data).format("YYYY-MM-DD");

    return auxData+"T"+auxHorario;

}

export const addDays = (data: Date | string, dias: number): Date => {
    return moment(data).add(dias, 'days').toDate();
}

export const addMonth = (data: Date | string, meses: number): Date | string => {
    return moment(data).add(meses, "month").toDate();
}

export const setHours = (data: Date | string, horas: number): Date => {
    return moment(data).set("hours", horas).toDate();
}

export const setMinutes = (data: Date | string, minutos: number): Date => {
    return moment(data).set("minutes", minutos).toDate();
}

export function duracao(data: any) {
    const m2 = moment();

    const anos = m2.diff(data, "years");
    const meses = m2.diff(data, "months");
    const semanas = m2.diff(data, "weeks");
    const dias = m2.diff(data, "days");
    const horas = m2.diff(data, "hours");
    const minutos = m2.diff(data, "minutes");
    const segundos = m2.diff(data, "seconds");

    function plural(num: number) {
        return num > 1 ? 's' : '';
    }

    if (anos > 0)
        return `${anos} ano${plural(anos)} atrás`
    else if (meses > 0)
        return `${meses} ${meses > 1 ? 'meses' : 'mês'} atrás`
    else if (semanas > 0)
        return `${semanas} semana${plural(semanas)} atrás`
    else if (dias > 0)
        return `${dias} dia${plural(dias)} atrás`
    else if (horas > 0)
        return `${horas} hora${plural(horas)} atrás`
    else if (minutos > 0)
        return `${minutos} minuto${plural(minutos)} atrás`
    else if (segundos > 0)
        return `${segundos} segundo${plural(segundos)} atrás`
    else
        return ""
}

export const primeiroDiaMes = (): string => {
    return moment(new Date()).utc().startOf("month").toISOString();
}

export const mesAnoAtual = (): string => {
    return primeiroDiaMes().split("T")[0].split("-").slice(0, 2).join("-")
}

export const dataPorExtenso = (data?: string | Date): string => {
    return moment(data).locale('pt-br').format('LL');
}