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
