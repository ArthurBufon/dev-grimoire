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

const padData = (valor: number): string => String(valor).padStart(2, '0');

export const dataLocalHoje = (): string => {
    const hoje = new Date();

    return `${hoje.getFullYear()}-${padData(hoje.getMonth() + 1)}-${padData(hoje.getDate())}`;
};

export const timestampAtual = () => {
    return new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
}
