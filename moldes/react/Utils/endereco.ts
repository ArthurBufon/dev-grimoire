/**
 * Utils/endereco.ts
 * Helper para validação e aplicação de máscara em CEP.
 */

import { somenteNumerosString } from "./index";

/**
 * Aplica máscara de CEP no formato 00000-000.
 *
 * Exemplos:
 *  - "01310100" -> "01310-100"
 *  - "013101"   -> "01310-1" (aplica parcialmente enquanto o usuário digita)
 *
 * @param valor Valor digitado (pode conter caracteres não numéricos)
 * @returns Valor formatado com a máscara de CEP
 */
export const aplicarMascaraCep = (valor: string): string => {
  if (!valor) {
    return "";
  }

  const numeros = somenteNumerosString(valor) ?? "".slice(0, 8);

  if (numeros.length <= 5) {
    return numeros;
  }

  return `${numeros.slice(0, 5)}-${numeros.slice(5, 8)}`;
};

/**
 * Remove a máscara, retornando apenas os números do CEP.
 *
 * @param valor CEP formatado
 * @returns Apenas os dígitos do CEP
 */
export const removerMascaraCep = (valor: string): string => {
  return somenteNumerosString(valor) ?? "";
};

/**
 * Valida se o CEP (com ou sem máscara) possui 8 dígitos.
 * Faz apenas validação de formato, não verifica se o CEP existe.
 *
 * @param valor CEP formatado ou numérico
 * @returns true se o CEP tiver 8 dígitos
 */
export const cepValido = (valor: string): boolean => {
  const numeros = somenteNumerosString(valor) ?? "";
  return numeros.length === 8;
};
