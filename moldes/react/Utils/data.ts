export const formatarParaView = (dateString: string) => {
    const [ano, mes, dia] = dateString.split('-').map(Number);

    return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export const timestampAtual = () => {
    return new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
}
