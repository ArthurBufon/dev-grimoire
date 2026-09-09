<?php

declare(strict_types=1);

namespace App\Services\Carro\View;

// QUERIES
use App\Queries\Carro\Queries as CarroQueries;
use App\Queries\Fabricante\Queries as FabricanteQueries;

class Service
{
    public function __construct(
        private CarroQueries $queries,
        private FabricanteQueries $fabricanteQueries,
    ) {
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
        $filtros['carregarRelacionamentos'] = ['fabricante'];

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
        return $this->dadosCatalogos();
    }

    private function dadosEdit(array $parametros): array
    {
        return array_merge([
            'carro' => $parametros['carro']->load('fabricante'),
        ], $this->dadosCatalogos());
    }

    private function dadosCatalogos(): array
    {
        $retorno = $this->fabricanteQueries->index([
            'ativo'               => true,
            'aplicar_paginacao'   => false,
            'quantidade'          => 200,
            'ordenacao'           => ['coluna' => 'nome', 'ordem' => 'asc'],
        ]);

        return [
            'fabricantes' => $retorno['dados']['lista'] ?? collect(),
        ];
    }

}
