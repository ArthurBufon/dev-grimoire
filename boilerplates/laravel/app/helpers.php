<?php

use App\Models\User;

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
    function ambienteDev(): string
    {
        $ambiente = env('APP_ENV', 'producao');

        return str_contains($ambiente, 'desenvolvimento') ? true : false;
    }
}

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


