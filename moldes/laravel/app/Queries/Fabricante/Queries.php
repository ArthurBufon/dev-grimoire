<?php

declare(strict_types=1);

namespace App\Queries\Fabricante;

// MODELS
use App\Models\Fabricante;

// ELOQUENT
use Illuminate\Database\Eloquent\Builder;

// HELPERS
use App\Helpers\Paginacao;

class Queries
{
    public function index(array $filtros): array
    {
        try {

            $query = Fabricante::query();

            $this->aplicarFiltros($query, $filtros);
            $this->aplicarOrdenacao($query, $filtros);

            ['lista' => $lista, 'paginacao' => $paginacao] = Paginacao::aplicarPaginacao($query, $filtros);

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
                    'lista'     => collect(),
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

    public function show(array $filtros): array
    {
        try {

            $query = Fabricante::query();

            $this->aplicarFiltros($query, $filtros);
            $this->aplicarOrdenacao($query, $filtros);

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

                case 'nome':
                case 'busca_geral':
                    $query->where('nome', 'like', "%{$valor}%");
                    break;

                case 'ativo':
                    $query->where('ativo', filter_var($valor, FILTER_VALIDATE_BOOLEAN));
                    break;
            }
        }
    }

    private function aplicarOrdenacao(Builder $query, array $filtros): void
    {
        $ordenacao = $filtros['ordenacao'] ?? null;

        if (!$ordenacao || empty($ordenacao['coluna']) || empty($ordenacao['ordem'])) {

            $query->orderBy('ativo', 'desc')->orderBy('nome');

            return;
        }

        $query->orderBy($ordenacao['coluna'], $ordenacao['ordem']);
    }

    public function store(array $dados): array
    {
        try {

            $retorno = Fabricante::create($dados);

            $sucesso = $retorno->id !== null;

            if (!$sucesso) {
                throw new \Exception('Erro ao salvar fabricante!');
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

            $model = Fabricante::findOrFail($id);

            $model->fill($dados);

            $sucesso = $model->save();

            if (!$sucesso) {
                throw new \Exception('Erro ao atualizar fabricante!');
            }

            return [
                'sucesso' => $sucesso,
                'dados'   => ['model' => $model->fresh()],
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

            $model = Fabricante::findOrFail($id);

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
