// ==========================
// CNPJ (alfanumérico - padrão vigente no Brasil)
// ==========================

function calcularValorCaractereCnpj(caractere: string): number {
  return caractere.charCodeAt(0) - 48;
}

function calcularDigitoCnpjAlfanumerico(base: string, pesos: number[]): number {
  let soma = 0;
  for (let i = 0; i < base.length; i++) {
    soma += calcularValorCaractereCnpj(base[i]) * pesos[i];
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function validarCnpjAlfanumerico(cnpj: string): boolean {
  const cnpjLimpo = cnpj.toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (!/^[A-Z0-9]{12}\d{2}$/.test(cnpjLimpo)) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(cnpjLimpo)) {
    return false;
  }

  const base = cnpjLimpo.substring(0, 12);
  const digitosInformados = cnpjLimpo.substring(12, 14);

  const pesosPrimeiroDigito = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesosSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const primeiroDigito = calcularDigitoCnpjAlfanumerico(base, pesosPrimeiroDigito);
  const segundoDigito = calcularDigitoCnpjAlfanumerico(
    base + primeiroDigito,
    pesosSegundoDigito,
  );

  return `${primeiroDigito}${segundoDigito}` === digitosInformados;
}

export function normalizarCnpj(cnpj: string): string {
  return cnpj.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

// ==========================
// CPF (somente numérico - módulo 11)
// ==========================

function calcularDigitoCpf(base: string, pesoInicial: number): number {
  let soma = 0;
  for (let i = 0; i < base.length; i++) {
    soma += Number(base[i]) * (pesoInicial - i);
  }
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

export function validarCpf(cpf: string): boolean {
  const cpfLimpo = normalizarCpf(cpf);

  // CPF sempre numérico, 11 dígitos
  if (!/^\d{11}$/.test(cpfLimpo)) {
    return false;
  }

  // Rejeita sequências de dígitos repetidos (ex: 111.111.111-11), inválidas na Receita
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    return false;
  }

  const base = cpfLimpo.substring(0, 9);
  const digitosInformados = cpfLimpo.substring(9, 11);

  // 1º dígito: pesos de 10 a 2 sobre os 9 primeiros dígitos
  const primeiroDigito = calcularDigitoCpf(base, 10);

  // 2º dígito: pesos de 11 a 2 sobre os 9 primeiros + 1º dígito calculado
  const segundoDigito = calcularDigitoCpf(base + primeiroDigito, 11);

  return `${primeiroDigito}${segundoDigito}` === digitosInformados;
}

export function normalizarCpf(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

// ==========================
// Utilitário genérico (opcional)
// ==========================

export function validarDocumento(documento: string): boolean {
  const limpo = documento.toUpperCase().replace(/[^A-Z0-9]/g, '');

  // CPF tem 11 caracteres e é sempre numérico
  if (limpo.length === 11) {
    return validarCpf(limpo);
  }

  // CNPJ tem 14 caracteres (alfanumérico nos 12 primeiros + 2 dígitos numéricos)
  if (limpo.length === 14) {
    return validarCnpjAlfanumerico(limpo);
  }

  return false;
}
