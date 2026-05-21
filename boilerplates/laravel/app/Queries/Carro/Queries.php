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

            $lista = $query->get();

            return [
                'sucesso' => true,
                'dados'   => ['lista' => $lista],
                'erros'   => [],
            ];
        } catch (\Throwable $th) {

            return [
                'sucesso' => false,
                'dados'   => ['lista' => collect()],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }

    public function show(array $filtros): array
    {
        try {

            $query = Carro::query();

            $this->aplicarFiltros($query, $filtros);

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

                case 'marca':
                    $query->where('marca', 'like', '%' . $valor . '%');
                    break;

                case 'modelo':
                    $query->where('modelo', 'like', '%' . $valor . '%');
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

    private function aplicarOrdenacao(Builder $query, array $filtros): void
    {
        $ordenacao = $filtros['ordenacao'] ?? null;

        if (!$ordenacao || empty($ordenacao['coluna']) || empty($ordenacao['ordem'])) {
            return;
        }

        $query->orderBy($ordenacao['coluna'], $ordenacao['ordem']);
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
