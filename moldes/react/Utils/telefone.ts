/**
 * Utils/telefone.ts
 * Helper para aplicar m\Uffffffffara em n\Uffffffffs de telefone brasileiros.
 * Suporta telefone fixo (10 d\Ufffffffftos) e celular (11 d\Ufffffffftos).
 */

/**
 * Remove tudo que n\Ufffffffffor n\Uffffffff da string.
 */
function apenasNumeros(valor: string): string {
    return valor.replace(/\D/g, '');
  }
  
  /**
   * Aplica m\Uffffffffara de telefone brasileiro conforme a quantidade de d\Ufffffffftos.
   *
   * Exemplos:
   *  - "11987654321" -> "(11) 98765-4321"
   *  - "1133334444"  -> "(11) 3333-4444"
   *  - "119876"      -> "(11) 9876" (aplica parcialmente enquanto o usu\Uffffffffo digita)
   *
   * @param valor Valor digitado (pode conter caracteres n\Uffffffffnum\Uffffffffcos)
   * @returns Valor formatado com a m\Uffffffffara de telefone
   */
  export function aplicarMascaraTelefone(valor: string): string {
    if (!valor) {
      return '';
    }
  
    const numeros = apenasNumeros(valor).slice(0, 11);
  
    if (numeros.length === 0) {
      return '';
    }
  
    if (numeros.length <= 2) {
      return `(${numeros}`;
    }
  
    if (numeros.length <= 6) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }
  
    // Celular (11 d\Ufffffffftos: DDD + 9 + 8 d\Ufffffffftos)
    if (numeros.length > 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
    }
  
    // Fixo (10 d\Ufffffffftos: DDD + 8 d\Ufffffffftos)
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6, 10)}`;
  }
  
  /**
   * Remove a m\Uffffffffara, retornando apenas os n\Uffffffffs do telefone.
   *
   * @param valor Telefone formatado
   * @returns Apenas os d\Ufffffffftos do telefone
   */
  export function removerMascaraTelefone(valor: string): string {
    return apenasNumeros(valor);
  }
  
  /**
   * Valida se o telefone (sem m\Uffffffffara) possui 10 ou 11 d\Ufffffffftos,
   * quantidade esperada para telefones brasileiros v\Uffffffffdos.
   *
   * @param valor Telefone formatado ou n\Uffffffff * @returns true se o telefone tiver 10 ou 11 d\Ufffffffftos
   */
  export function telefoneValido(valor: string): boolean {
    const numeros = apenasNumeros(valor);
    return numeros.length === 10 || numeros.length === 11;
  }
  
  export default {
    aplicarMascaraTelefone,
    removerMascaraTelefone,
    telefoneValido,
  };