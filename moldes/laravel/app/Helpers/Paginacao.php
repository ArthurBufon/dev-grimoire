<?php

declare(strict_types=1);

namespace App\Helpers;

// ELOQUENT
use Illuminate\Database\Eloquent\Builder;

class Paginacao
{
    public static function montarDadosPaginacao(
        int $totalFiltrados,
        int $totalRetornado,
        ?int $pagina = null,
        ?int $limite = null,
        ?int $totalPaginas = null
    ): array {
        $dados = [
            'total'           => $totalFiltrados,
            'total_retornado' => $totalRetornado,
        ];

        if ($pagina !== null && $limite !== null && $limite > 0) {

            $dados['pagina']        = $pagina;
            $dados['limite']        = $limite;
            $dados['total_paginas'] = $totalPaginas ?? (int) ceil($totalFiltrados / $limite);
        }

        return $dados;
    }

    public static function aplicarPaginacao(Builder $query, array $filtros, int $porPagina = 10, int $maximoPaginas = 10, int $tetoQuantidade = 100): array
    {
        if (! self::deveAplicarPaginacao($filtros)) {

            $totalFiltrado = (clone $query)->count();
            $quantidade    = self::resolverQuantidadeOpcional($filtros, $tetoQuantidade);

            if ($quantidade !== null) {
                $query->limit($quantidade);
            }

            $lista = $query->get();

            return [
                'lista'     => $lista,
                'paginacao' => self::montarDadosPaginacao($totalFiltrado, $lista->count()),
            ];
        }

        $porPagina = self::resolverPorPagina($filtros, $porPagina, $tetoQuantidade);

        $totalRegistrosFiltrados = (clone $query)->count();
        $totalPaginas            = (int) ceil($totalRegistrosFiltrados / $porPagina);

        if (! filter_var($filtros['sem_limite_paginas'] ?? false, FILTER_VALIDATE_BOOLEAN)) {
            $totalPaginas = min($totalPaginas, $maximoPaginas);
        }

        $paginaSolicitada = max(1, (int) ($filtros['pagina'] ?? 1));
        $pagina           = min($paginaSolicitada, max(1, $totalPaginas));

        $offset = ($pagina - 1) * $porPagina;
        $query->offset($offset)->limit($porPagina);
        $lista = $query->get();

        $paginacao = self::montarDadosPaginacao(
            $totalRegistrosFiltrados,
            $lista->count(),
            $pagina,
            $porPagina,
            $totalPaginas
        );

        return [
            'lista'     => $lista,
            'paginacao' => $paginacao,
        ];
    }

    private static function resolverQuantidadeOpcional(array $filtros, int $tetoQuantidade = 100): ?int
    {
        if (! array_key_exists('quantidade', $filtros)) {
            return null;
        }

        $quantidade = (int) $filtros['quantidade'];

        if ($quantidade <= 0) {
            return null;
        }

        return min($quantidade, $tetoQuantidade);
    }

    private static function resolverPorPagina(array $filtros, int $padrao, int $tetoQuantidade = 100): int
    {
        return self::resolverQuantidadeOpcional($filtros, $tetoQuantidade) ?? $padrao;
    }

    private static function deveAplicarPaginacao(array $filtros): bool
    {
        if (! array_key_exists('aplicar_paginacao', $filtros)) {
            return true;
        }

        return filter_var($filtros['aplicar_paginacao'], FILTER_VALIDATE_BOOLEAN);
    }
}
