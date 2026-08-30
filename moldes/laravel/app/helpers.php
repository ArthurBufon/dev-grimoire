<?php

if (!function_exists('formatarMensagemErro')) {
    function formatarMensagemErro(Throwable $th): string
    {
        return $th->getMessage() . " | " . $th->getFile() . " | " . $th->getLine();
    }
}

if (!function_exists('somenteNumeros')) {
    function somenteNumeros(string $string): string
    {
        return preg_replace("/[^0-9]/", "", $string);
    }
}

if (!function_exists('ambienteDev')) {
    function ambienteDev(): bool
    {
        $ambiente = env('APP_ENV', 'producao');

        return str_contains($ambiente, 'desenvolvimento') ? true : false;
    }
}

// ==========================
// CNPJ (alfanumérico - padrão vigente no Brasil)
// ==========================

if (!function_exists('validarCnpjAlfanumerico')) {
    function validarCnpjAlfanumerico(string $cnpj): bool
    {
        $cnpjLimpo = strtoupper($cnpj);
        $cnpjLimpo = preg_replace('/[^A-Z0-9]/', '', $cnpjLimpo);

        if (! preg_match('/^[A-Z0-9]{12}\d{2}$/', $cnpjLimpo)) {
            return false;
        }

        if (preg_match('/^(\d)\1{13}$/', $cnpjLimpo)) {
            return false;
        }

        $base = substr($cnpjLimpo, 0, 12);
        $digitosInformados = substr($cnpjLimpo, 12, 2);

        $pesosPrimeiroDigito = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        $pesosSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        $primeiroDigito = calcularDigitoCnpjAlfanumerico($base, $pesosPrimeiroDigito);
        $segundoDigito  = calcularDigitoCnpjAlfanumerico($base.$primeiroDigito, $pesosSegundoDigito);

        return ($primeiroDigito.$segundoDigito) === $digitosInformados;
    }
}

if (!function_exists('calcularDigitoCnpjAlfanumerico')) {
    function calcularDigitoCnpjAlfanumerico(string $base, array $pesos): int
    {
        $soma = 0;

        for ($i = 0; $i < strlen($base); $i++) {
            $soma += calcularValorCaractereCnpj($base[$i]) * $pesos[$i];
        }

        $resto = $soma % 11;

        return $resto < 2 ? 0 : 11 - $resto;
    }
}

if (!function_exists('calcularValorCaractereCnpj')) {
    function calcularValorCaractereCnpj(string $caractere): int
    {
        return ord($caractere) - 48;
    }
}

if (!function_exists('normalizarCnpj')) {
    function normalizarCnpj(string $cnpj): string
    {
        return strtoupper(preg_replace('/[^A-Z0-9]/', '', $cnpj));
    }
}

// ==========================
// CPF (somente numérico - módulo 11)
// ==========================

if (!function_exists('validarCpf')) {
    function validarCpf(string $cpf): bool
    {
        $cpfLimpo = normalizarCpf($cpf);

        // CPF sempre numérico, 11 dígitos
        if (! preg_match('/^\d{11}$/', $cpfLimpo)) {
            return false;
        }

        // Rejeita sequências de dígitos repetidos (ex: 111.111.111-11), inválidas na Receita
        if (preg_match('/^(\d)\1{10}$/', $cpfLimpo)) {
            return false;
        }

        $base = substr($cpfLimpo, 0, 9);
        $digitosInformados = substr($cpfLimpo, 9, 2);

        // 1º dígito: pesos de 10 a 2 sobre os 9 primeiros dígitos
        $primeiroDigito = calcularDigitoCpf($base, 10);

        // 2º dígito: pesos de 11 a 2 sobre os 9 primeiros + 1º dígito calculado
        $segundoDigito = calcularDigitoCpf($base.$primeiroDigito, 11);

        return ($primeiroDigito.$segundoDigito) === $digitosInformados;
    }
}

if (!function_exists('calcularDigitoCpf')) {
    function calcularDigitoCpf(string $base, int $pesoInicial): int
    {
        $soma = 0;

        for ($i = 0; $i < strlen($base); $i++) {
            $soma += (int) $base[$i] * ($pesoInicial - $i);
        }

        $resto = $soma % 11;

        return $resto < 2 ? 0 : 11 - $resto;
    }
}

if (!function_exists('normalizarCpf')) {
    function normalizarCpf(string $cpf): string
    {
        return preg_replace('/\D/', '', $cpf);
    }
}

// ==========================
// Utilitário genérico (opcional)
// ==========================

if (!function_exists('validarDocumento')) {
    function validarDocumento(string $documento): bool
    {
        $limpo = strtoupper($documento);
        $limpo = preg_replace('/[^A-Z0-9]/', '', $limpo);

        // CPF tem 11 caracteres e é sempre numérico
        if (strlen($limpo) === 11) {
            return validarCpf($limpo);
        }

        // CNPJ tem 14 caracteres (alfanumérico nos 12 primeiros + 2 dígitos numéricos)
        if (strlen($limpo) === 14) {
            return validarCnpjAlfanumerico($limpo);
        }

        return false;
    }
}
