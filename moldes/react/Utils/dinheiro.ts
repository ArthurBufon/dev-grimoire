export const formatarDinheiroParaReal = (
  valor: string | number,
): string => {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const extrairDecimalDoInput = (valorDigitado: string): string => {
  const apenasDigitos = valorDigitado.replace(/\D/g, '');

  if (!apenasDigitos) {
    return '0.00';
  }

  const valorComCasasDecimais = apenasDigitos.padStart(3, '0');
  const parteInteira = valorComCasasDecimais.slice(0, -2);
  const parteDecimal = valorComCasasDecimais.slice(-2);

  return `${Number(parteInteira)}.${parteDecimal}`;
};
