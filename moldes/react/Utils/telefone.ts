/**
 * Utils/telefone.ts
 * Helper para aplicar máscara em números de telefone brasileiros.
 * Suporta telefone fixo (10 dígitos) e celular (11 dígitos).
 */

import { somenteNumerosString } from "./index";

/**
 * Aplica máscara de telefone brasileiro conforme a quantidade de dígitos.
 *
 * Exemplos:
 *  - "11987654321" -> "(11) 98765-4321"
 *  - "1133334444"  -> "(11) 3333-4444"
 *  - "119876"      -> "(11) 9876" (aplica parcialmente enquanto o usuário digita)
 *
 * @param valor Valor digitado (pode conter caracteres não numéricos)
 * @returns Valor formatado com a máscara de telefone
 */
export const aplicarMascaraTelefone = (valor: string): string => {
  if (!valor) {
    return '';
  }

  const numeros = somenteNumerosString(valor) ?? "".slice(0, 11);

  if (numeros.length === 0) {
    return '';
  }

  if (numeros.length <= 2) {
    return `(${numeros}`;
  }

  if (numeros.length <= 6) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  // Celular (11 dígitos: DDD + 9 + 8 dígitos)
  if (numeros.length > 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
  }

  // Fixo (10 dígitos: DDD + 8 dígitos)
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6, 10)}`;
};

/**
 * Remove a máscara, retornando apenas os números do telefone.
 *
 * @param valor Telefone formatado
 * @returns Apenas os dígitos do telefone
 */
export const removerMascaraTelefone = (valor: string): string => {
  return somenteNumerosString(valor) ?? "";
};

/**
 * Valida se o telefone (sem máscara) possui 10 ou 11 dígitos,
 * quantidade esperada para telefones brasileiros válidos.
 *
 * @param valor Telefone formatado ou numérico
 * @returns true se o telefone tiver 10 ou 11 dígitos
 */
export const telefoneValido = (valor: string): boolean => {
  const numeros = somenteNumerosString(valor) ?? "";
  return numeros.length === 10 || numeros.length === 11;
};
