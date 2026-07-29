<?php

declare(strict_types=1);

namespace App\Queries\Carro;

use App\Models\Carro;
use Illuminate\Database\Eloquent\Builder;

class Queries
{
    public function index(array $filtros): array
    {
        try {
            $query = Carro::query();

            $this->aplicarFiltros($query, $filtros);
            $this->aplicarOrdenacao($query, $filtros);
            $this->carregarRelacionamentos($query, $filtros);

            ['lista' => $lista, 'paginacao' => $paginacao] = $this->aplicarPaginacao($query, $filtros);

            return [
                'sucesso' => true,
                'dados' => [
                    'lista' => $lista,
                    'paginacao' => $paginacao,
                ],
                'erros' => [],
            ];
        } catch (\Throwable $th) {
            return [
                'sucesso' => false,
                'dados' => [
                    'lista' => [],
                    'paginacao' => [
                        'total' => 0,
                        'total_retornado' => 0,
                        'pagina' => 1,
                        'limite' => 0,
                        'total_paginas' => 0,
                    ],
                ],
                'erros' => [formatarMensagemErro($th)],
            ];
        }
    }

    private function aplicarFiltros(Builder $query, array $filtros): void
    {
        foreach ($filtros as $chave => $valor) {

            if ($valor === null || $valor === '') {
                continue;
            }

            switch ($chave) {

                case 'id':
                    $query->where('id', $valor);
                    break;

                case 'busca_geral':
                    $this->aplicarBuscaGeral($query, $valor);
                    break;

                case 'marca':
                    $query->where('marca', 'like', "%{$valor}%");
                    break;

                case 'modelo':
                    $query->where('modelo', 'like', "%{$valor}%");
                    break;

                case 'ano':
                    $query->where('ano', $valor);
                    break;

                case 'placa':
                    $query->where('placa', $valor);
                    break;
            }
        }
    }

    private function aplicarBuscaGeral(Builder $query, string $valor): void
    {
        $query->where('marca', 'like', "%{$valor}%")
            ->orWhere('modelo', 'like', "%{$valor}%")
            ->orWhere('ano', 'like', "%{$valor}%")
            ->orWhere('placa', 'like', "%{$valor}%");
    }

    private function aplicarOrdenacao(Builder $query, array $filtros): void
    {
        $ordenacao = $filtros['ordenacao'] ?? ['coluna' => 'id', 'ordem' => 'desc'];

        $query->orderBy($ordenacao['coluna'], $ordenacao['ordem']);
    }

    private function carregarRelacionamentos(Builder $query, array $filtros): void
    {
        $carregarRelacionamentos = $filtros['carregarRelacionamentos'] ?? [];

        if (empty($carregarRelacionamentos)) {
            return;
        }

        $query->with($carregarRelacionamentos);
    }

    private function aplicarPaginacao(Builder $query, array $filtros): array
    {
        $porPagina = 10;
        $maximoPaginas = 10;

        // total de registros e páginas disponíveis, já limitado por $maximoPaginas
        $totalRegistrosFiltrados = (clone $query)->count();
        $totalPaginas = min(
            (int) ceil($totalRegistrosFiltrados / $porPagina),
            $maximoPaginas
        );

        // página pedida, corrigida para ficar dentro do intervalo válido
        $paginaSolicitada = max(1, (int) ($filtros['pagina'] ?? 1));
        $pagina = min($paginaSolicitada, max(1, $totalPaginas));

        // aplica o recorte na query e executa
        $offset = ($pagina - 1) * $porPagina;
        $query->offset($offset)->limit($porPagina);
        $lista = $query->get();

        // monta os metadados de paginação (total_paginas já calculado acima, já limitado por $maximoPaginas)
        $paginacao = montarDadosPaginacao(
            $totalRegistrosFiltrados,
            $lista->count(),
            $pagina,
            $porPagina,
            $totalPaginas
        );

        return [
            'lista' => $lista,
            'paginacao' => $paginacao,
        ];
    }
}
