<?php

declare(strict_types=1);

namespace App\Services\Carro\View;

use App\Queries\Carro\Queries as CarroQueries;

class Service
{
    public function __construct(private CarroQueries $queries)
    {
        //
    }

    public function index(array $parametros): array
    {
        try {
            $view = $parametros['view'];

            switch ($view) {
                case 'index':
                    return $this->dadosIndex($parametros);

                case 'create':
                    return $this->dadosCreate($parametros);

                case 'edit':
                    return $this->dadosEdit($parametros);

                case 'show':
                    return $this->dadosShow($parametros);
            }

            return [];
        } catch (\Throwable $th) {
            return [];
        }
    }

    private function dadosIndex(array $parametros): array
    {
        $filtros = $parametros['filtros'] ?? [];
        $retorno = $this->queries->index($filtros)['dados'];

        return [
            'lista'     => $retorno['lista'],
            'paginacao' => $retorno['paginacao'],
            'filtros'   => $filtros,
        ];
    }

    private function dadosShow(array $parametros): array
    {
        return [
            'carro' => $parametros['carro'],
        ];
    }

    private function dadosCreate(array $parametros): array
    {
        return [];
    }

    private function dadosEdit(array $parametros): array
    {
        return [
            'carro' => $parametros['carro'],
        ];
    }

}
