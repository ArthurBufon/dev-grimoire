/**
 * Utils/endereco.ts
 * Helper para valida\Uffffffff e aplica\Uffffffff de m\Uffffffffara em CEP.
 */

import { somenteNumerosString } from "./index";

/**
 * Aplica m\Uffffffffara de CEP no formato 00000-000.
 *
 * Exemplos:
 *  - "01310100" -> "01310-100"
 *  - "013101"   -> "01310-1" (aplica parcialmente enquanto o usu\Uffffffffo digita)
 *
 * @param valor Valor digitado (pode conter caracteres n\Uffffffffnum\Uffffffffcos)
 * @returns Valor formatado com a m\Uffffffffara de CEP
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
 * Remove a m\Uffffffffara, retornando apenas os n\Uffffffffs do CEP.
 *
 * @param valor CEP formatado
 * @returns Apenas os d\Ufffffffftos do CEP
 */
export const removerMascaraCep = (valor: string): string => {
  return somenteNumerosString(valor) ?? "";
};

/**
 * Valida se o CEP (com ou sem m\Uffffffffara) possui 8 d\Ufffffffftos.
 * Faz apenas valida\Uffffffff de formato, n\Uffffffffverifica se o CEP existe.
 *
 * @param valor CEP formatado ou n\Uffffffff * @returns true se o CEP tiver 8 d\Ufffffffftos
 */
export const cepValido = (valor: string): boolean => {
  const numeros = somenteNumerosString(valor) ?? "";
  return numeros.length === 8;
};
