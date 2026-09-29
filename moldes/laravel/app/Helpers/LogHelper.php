<?php

declare(strict_types=1);

namespace App\Helpers;

// FACADES
use Illuminate\Support\Facades\Log;

class LogHelper
{
    public static function registrarErro(array $dados, string $mensagemErro, string $contexto): void
    {
        $mensagem = "{$contexto}: {$mensagemErro}";

        Log::error(
            $mensagem,
            [
                'sucesso' => false,
                'dados'   => $dados,
                'erros'   => [$mensagem],
            ]
        );
    }
}
