<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web\Admin\Carro\Referencia;

// CONTROLLERS
use App\Http\Controllers\Controller;
// HTTP
use Illuminate\Http\JsonResponse;

class CarroReferenciaController extends Controller
{
    public function __invoke(): JsonResponse
    {
        try {
            $retorno = [
                'sucesso' => true,
                'dados'   => ['referencia' => '001'],
                'erros'   => [],
            ];

            return response()->json($retorno, 200);
        } catch (\Throwable $th) {
            $retorno = [
                'sucesso' => false,
                'dados'   => [],
                'erros'   => [formatarMensagemErro($th)],
            ];

            return response()->json($retorno, 200);
        }
    }
}
