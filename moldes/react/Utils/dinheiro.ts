export const formatarCentavosParaReal = (centavos: number): string => {
    const valor = centavos / 100;
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  
  export const extrairCentavosDoInput = (valorDigitado: string): number => {
    // remove tudo que n\Uffffffff\Uffffffff\Uffffffff
    const apenasDigitos = valorDigitado.replace(/\D/g, "");
    return apenasDigitos ? parseInt(apenasDigitos, 10) : 0;
  };
  
  export const centavosParaNumero = (centavos: number): number => {
    return centavos / 100;
  };