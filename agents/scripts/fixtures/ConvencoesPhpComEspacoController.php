<?php

class ConvencoesPhpComEspacoController
{
    public function __invoke(): mixed
    {
        return response()->json( [
            'sucesso' => true,
            'dados'   => [],
            'erros'   => [],
        ]);
    }
}
