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

            $totalRegistrosFiltrados = (clone $query)->count();

            $pagina = $this->resolverPagina($filtros);
            $limite = $this->resolverLimite($filtros);

            $this->aplicarPaginacao($query, $pagina, $limite);

            $lista = $query->get();

            $paginacao = montarDadosPaginacao(
                $totalRegistrosFiltrados,
                $lista->count(),
                $pagina,
                $limite
            );

            return [
                'sucesso' => true,
                'dados'   => [
                    'lista'     => $lista,
                    'paginacao' => $paginacao,
                ],
                'erros'   => [],
            ];
        } catch (\Throwable $th) {

            return [
                'sucesso' => false,
                'dados'   => [
                    'lista'     => [],
                    'paginacao' => [
                        'total'           => 0,
                        'total_retornado' => 0,
                        'pagina'          => 1,
                        'limite'          => 0,
                        'total_paginas'   => 0,
                    ],
                ],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }

    private function aplicarPaginacao(Builder $query, int $pagina, ?int $limite): void
    {
        if ($limite === null) {

            return;
        }

        $offset = ($pagina - 1) * $limite;

        $query->offset($offset)->limit($limite);
    }

    private function resolverPagina(array $filtros): int
    {
        $pagina = (int) ($filtros['pagina'] ?? 1);

        return $pagina > 0 ? $pagina : 1;
    }

    private function resolverLimite(array $filtros): ?int
    {
        $limite = $filtros['limite'] ?? $filtros['quantidade'] ?? null;

        if ($limite === null || $limite === '') {

            return null;
        }

        $limite = (int) $limite;

        return $limite > 0 ? $limite : null;
    }

    public function show(array $filtros): array
    {
        try {

            $query = Carro::query();

            $this->aplicarFiltros($query, $filtros);
            $this->aplicarOrdenacao($query, $filtros);
            $this->carregarRelacionamentos($query, $filtros);

            $model = $query->first();

            return [
                'sucesso' => true,
                'dados'   => ['model' => $model],
                'erros'   => [],
            ];
        } catch (\Throwable $th) {

            return [
                'sucesso' => false,
                'dados'   => ['model' => null],
                'erros'   => [formatarMensagemErro($th)],
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
                    if (empty($valor)) continue;

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
        $ordenacao = $filtros['ordenacao'] ?? null;

        if (!$ordenacao || empty($ordenacao['coluna']) || empty($ordenacao['ordem'])) {
            return;
        }

        $query->orderBy($ordenacao['coluna'], $ordenacao['ordem']);
    }

    private function carregarRelacionamentos(Builder $query, array $filtros): void
    {
        $carregarRelacionamentos = $filtros['carregarRelacionamentos'] ?? [];

        if (empty($carregarRelacionamentos)) return;

        $query->with($carregarRelacionamentos);
    }

    public function store(array $dados): array
    {
        try {

            $retorno = Carro::create($dados);

            $sucesso = $retorno->id !== null;

            if (!$sucesso) {
                throw new \Exception('Erro ao salvar carro!');
            }

            return [
                'sucesso' => $sucesso,
                'dados'   => ['model' => $retorno, 'id' => $retorno->id],
                'erros'   => [],
            ];
        } catch (\Throwable $th) {

            return [
                'sucesso' => false,
                'dados'   => [],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }

    public function update(int $id, array $dados): array
    {
        try {

            $model = Carro::findOrFail($id);

            $model->fill($dados);

            $sucesso = $model->save();

            if (!$sucesso) {
                throw new \Exception('Erro ao atualizar carro!');
            }

            return [
                'sucesso' => $sucesso,
                'dados'   => ['model' => $model],
                'erros'   => [],
            ];
        } catch (\Throwable $th) {

            return [
                'sucesso' => false,
                'dados'   => [],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }

    public function destroy(string|int $id): array
    {
        try {

            $model = Carro::findOrFail($id);

            $linhasAfetadas = $model->delete();

            $sucesso = $linhasAfetadas > 0;

            return [
                'sucesso' => $sucesso,
                'dados'   => [],
                'erros'   => [],
            ];
        } catch (\Throwable $th) {

            return [
                'sucesso' => false,
                'dados'   => [],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }
}