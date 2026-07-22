<?php

declare(strict_types=1);

namespace App\Services\Carro\View;

use App\Models\Carro;

use App\Queries\Carro\Queries as CarroQueries;
use App\Queries\Marca\Queries as MarcaQueries;
use App\Queries\Modelo\Queries as ModeloQueries;
use App\Queries\Categoria\Queries as CategoriaQueries;
use App\Queries\Combustivel\Queries as CombustivelQueries;
use App\Queries\Cambio\Queries as CambioQueries;

class Service
{
    public function __construct(
        private CarroQueries $queries,
        private MarcaQueries $marcaQueries,
        private ModeloQueries $modeloQueries,
        private CategoriaQueries $categoriaQueries,
        private CombustivelQueries $combustivelQueries,
        private CambioQueries $cambioQueries,
    ) {}

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
        $filtrosBusca = [
            'empresa_id' => 1,
            'quantidade' => 100,
            'ordenacao'  => [
                'coluna' => 'id',
                'ordem'  => 'desc',
            ],
        ];

        if (ambienteDev()) {
            // $filtrosBusca['quantidade'] = 10;
            // $filtrosBusca['marca_id'] = 1;
        }

        $retornoCarros = $this->queries->index($filtrosBusca)['dados'];

        $carros = $retornoCarros['lista'];
        $paginacao = $retornoCarros['paginacao'];

        $carros = $carros->map(function (Carro $carro) {
            return $this->carregarRelacionamentos($carro);
        });

        return [
            'carros'       => $carros,
            'paginacao'    => $paginacao,
            'marcas'       => $this->marcaQueries->index([])['dados']['lista'] ?? [],
            'modelos'      => $this->modeloQueries->index([])['dados']['lista'] ?? [],
            'categorias'   => $this->categoriaQueries->index([])['dados']['lista'] ?? [],
            'combustiveis' => $this->combustivelQueries->index([])['dados']['lista'] ?? [],
            'cambios'      => $this->cambioQueries->index([])['dados']['lista'] ?? [],
        ];
    }

    private function dadosShow(array $parametros): array
    {
        $carro = $this->carregarRelacionamentos($parametros['carro']);

        return [
            'carro' => $carro,
        ];
    }

    private function dadosCreate(array $parametros): array
    {
        return [
            'marcas'       => $this->marcaQueries->index([])['dados']['lista'] ?? [],
            'modelos'      => $this->modeloQueries->index([])['dados']['lista'] ?? [],
            'categorias'   => $this->categoriaQueries->index([])['dados']['lista'] ?? [],
            'combustiveis' => $this->combustivelQueries->index([])['dados']['lista'] ?? [],
            'cambios'      => $this->cambioQueries->index([])['dados']['lista'] ?? [],
        ];
    }

    private function dadosEdit(array $parametros): array
    {
        $carro = $this->carregarRelacionamentos($parametros['carro']);

        return [
            'carro'        => $carro,
            'marcas'       => $this->marcaQueries->index([])['dados']['lista'] ?? [],
            'modelos'      => $this->modeloQueries->index([])['dados']['lista'] ?? [],
            'categorias'   => $this->categoriaQueries->index([])['dados']['lista'] ?? [],
            'combustiveis' => $this->combustivelQueries->index([])['dados']['lista'] ?? [],
            'cambios'      => $this->cambioQueries->index([])['dados']['lista'] ?? [],
        ];
    }

    private function carregarRelacionamentos(Carro $carro): Carro
    {
        $carro->load([
            'marca',
            'modelo',
            'categoria',
            'combustivel',
            'cambio',

            'acessorios' => function ($query) {
                $query->with(['categoria']);
            },

            'fotos' => function ($query) {
                $query->orderBy('ordem');
            },

            'historicoManutencoes' => function ($query) {
                $query->with(['oficina']);
            },
        ]);

        return $carro;
    }
}