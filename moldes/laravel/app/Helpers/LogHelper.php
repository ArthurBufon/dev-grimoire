<?php

declare(strict_types=1);

namespace App\Helpers;

// FACADES
use Illuminate\Support\Facades\Log;

class LogHelper
{
    public static function logarErro(array $dados, string $mensagemAmigavel, string $mensagemErro): void
    {
        $contexto = [
            'sucesso' => 'false',
            'dados'   => $dados,
            'erros'   => ["{$mensagemAmigavel}: {$mensagemErro}"],
        ];

        Log::error($mensagemAmigavel, $contexto);
    }
}
