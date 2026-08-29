export const formatarParaView = (
    data: string | null,
    fallback = '',
): string => {
    if (!data) {
        return fallback;
    }

    const [ano, mes, dia] = data.split('-').map(Number);

    return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const INTERVALO_SUGESTAO_MINUTOS = 30;

const padData = (valor: number): string => String(valor).padStart(2, '0');

export const dataLocalHoje = (): string => {
    const hoje = new Date();

    return `${hoje.getFullYear()}-${padData(hoje.getMonth() + 1)}-${padData(hoje.getDate())}`;
};

export const formatarDataHoraLocal = (data: Date): string => {
    return `${data.getFullYear()}-${padData(data.getMonth() + 1)}-${padData(data.getDate())}T${padData(data.getHours())}:${padData(data.getMinutes())}`;
};

export const parsearDataHoraLocal = (valor: string): Date | null => {
    const [dataParte, horaParte] = valor.split('T');

    if (!dataParte || !horaParte) {
        return null;
    }

    const [ano, mes, dia] = dataParte.split('-').map(Number);
    const [hora, minuto] = horaParte.split(':').map(Number);

    if ([ano, mes, dia, hora, minuto].some((parte) => Number.isNaN(parte))) {
        return null;
    }

    return new Date(ano, mes - 1, dia, hora, minuto);
};

export const dataHoraLocalSugerida = (): string => {
    const data = new Date();
    data.setSeconds(0, 0);
    data.setMinutes(data.getMinutes() + INTERVALO_SUGESTAO_MINUTOS);

    const resto = data.getMinutes() % INTERVALO_SUGESTAO_MINUTOS;

    if (resto !== 0) {
        data.setMinutes(data.getMinutes() + (INTERVALO_SUGESTAO_MINUTOS - resto));
    }

    return formatarDataHoraLocal(data);
};

export const somarMinutosDataHoraLocal = (
    valor: string,
    minutos: number,
): string => {
    const data = parsearDataHoraLocal(valor);

    if (!data) {
        return '';
    }

    data.setMinutes(data.getMinutes() + minutos);

    return formatarDataHoraLocal(data);
};

export const timestampAtual = () => {
    return new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
}
