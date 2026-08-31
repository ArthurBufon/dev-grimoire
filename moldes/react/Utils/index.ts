export const isEmpty = (lista: readonly unknown[] | undefined | null): boolean => {
    if (!lista) return true;

    if (lista.length === 0) return true;

    return false;
};

export const stringVazia = (valor: string | null | undefined): boolean => {
    if (!valor) return true;

    return valor.trim() === "";
};

export const formatarLowerCase = (valor: string | null | undefined): string => {
    if (!valor) return "";

    return valor.toLowerCase();
};

export const somenteNumeros = (valor: unknown): number | null => {
    if (!valor) return null;

    return Number(String(valor).replace(/[^0-9]/g, ""));
};

export const somenteNumerosString = (valor: unknown): string | null => {
    if (!valor) return null;

    return String(valor).replace(/[^0-9]/g, "");
};

/** Dígitos como string (preserva zeros à esquerda). Preferir a CPF/telefone em vez de `somenteNumeros`, que usa `Number` e trunca. */
export const apenasDigitos = (valor: string | null | undefined): string =>
    String(valor ?? "").replace(/\D/g, "");
