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

    public static function aplicarPaginacao(Builder $query, array $filtros, int $porPagina = 10, int $maximoPaginas = 10): array
    {
        if (! self::deveAplicarPaginacao($filtros)) {

            $lista = $query->get();

            return [
                'lista'     => $lista,
                'paginacao' => self::montarDadosPaginacao($lista->count(), $lista->count()),
            ];
        }

        $porPagina = self::resolverPorPagina($filtros, $porPagina);

        $totalRegistrosFiltrados = (clone $query)->count();
        $totalPaginas            = min(
            (int) ceil($totalRegistrosFiltrados / $porPagina),
            $maximoPaginas
        );

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

    private static function resolverPorPagina(array $filtros, int $padrao): int
    {
        if (! array_key_exists('quantidade', $filtros)) {
            return $padrao;
        }

        $quantidade = (int) $filtros['quantidade'];

        if ($quantidade <= 0) {
            return $padrao;
        }

        return min($quantidade, 100);
    }

    private static function deveAplicarPaginacao(array $filtros): bool
    {
        if (! array_key_exists('aplicar_paginacao', $filtros)) {
            return true;
        }

        return filter_var($filtros['aplicar_paginacao'], FILTER_VALIDATE_BOOLEAN);
    }
}
