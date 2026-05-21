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


