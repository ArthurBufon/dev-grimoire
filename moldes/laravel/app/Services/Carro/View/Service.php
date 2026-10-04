<?php

declare(strict_types=1);

namespace App\Services\Carro\View;

// QUERIES
use App\Queries\Fabricante\Queries as FabricanteQueries;
// SERVICES
use App\Services\Carro\Service as CarroService;

class Service
{
    public function __construct(
        private CarroService $service,
        private FabricanteQueries $fabricanteQueries,
    ) {
        //
    }

    public function index(array $parametros): array
    {
        try {
            $view = $parametros['view'] ?? '';

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
            if ($view === 'index') {
                return $this->dadosIndexVazio($parametros['filtros'] ?? []);
            }

            return [];
        }
    }

    private function dadosIndexVazio(array $filtros): array
    {
        return [
            'lista'     => collect(),
            'paginacao' => [
                'total'           => 0,
                'total_retornado' => 0,
                'pagina'          => 1,
                'limite'          => 0,
                'total_paginas'   => 0,
            ],
            'filtros'   => $filtros,
            'fabricantes' => collect(),
        ];
    }

    private function dadosIndex(array $parametros): array
    {
        $filtros = $parametros['filtros'] ?? [];
        $filtros['carregarRelacionamentos'] = ['fabricante'];

        $retorno = $this->service->index($filtros)['dados'];

        return array_merge([
            'lista'     => $retorno['lista'],
            'paginacao' => $retorno['paginacao'],
            'filtros'   => $filtros,
        ], $this->dadosCatalogos());
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
            'quantidade'          => 100,
            'ordenacao'           => ['coluna' => 'nome', 'ordem' => 'asc'],
        ]);

        return [
            'fabricantes' => $retorno['dados']['lista'] ?? collect(),
        ];
    }

}
