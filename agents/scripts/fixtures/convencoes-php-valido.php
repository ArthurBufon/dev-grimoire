<?php

namespace App\Fixtures;

// CONTROLLERS
use App\Http\Controllers\Controller;
// HTTP
use Illuminate\Http\JsonResponse;

class ConvencoesPhpValidoController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $retorno = [
            'sucesso' => true,
            'dados'   => [],
            'erros'   => [],
        ];

        return response()->json($retorno, 200);
    }
}
