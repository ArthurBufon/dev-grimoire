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

export const valorParaCentavos = (valor: string): number => {
  const partes = valor.split('.');
  const reais = Number.parseInt(partes[0] || '0', 10);
  const centavos = Number.parseInt(
    (partes[1] || '00').padEnd(2, '0').slice(0, 2),
    10,
  );

  return reais * 100 + centavos;
};

export const centavosParaDecimal = (totalCentavos: number): string => {
  const reais = Math.floor(totalCentavos / 100);
  const resto = totalCentavos % 100;

  return `${reais}.${String(resto).padStart(2, '0')}`;
};

export const formatarCentavos = (totalCentavos: number): string => {
  return formatarDinheiroParaReal(centavosParaDecimal(totalCentavos));
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
