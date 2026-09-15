<?php

namespace App\Fixtures;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ConvencoesPhpInvalidoController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'sucesso' => true,
            'dados'   => [],
            'erros'   => [],
        ], 200);
    }
}
