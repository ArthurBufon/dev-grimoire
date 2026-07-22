export const formatarParaView = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
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
