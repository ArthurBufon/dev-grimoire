<?php

declare(strict_types=1);

namespace App\Services\Fabricante;

// MODELS
use App\Models\Fabricante;
// QUERIES
use App\Queries\Fabricante\Queries;
// FACADES
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Service
{
    public function __construct(private Queries $queries)
    {
        //
    }

    public function index(array $filtros): array
    {
        return $this->queries->index($filtros);
    }

    public function show(array $filtros): array
    {
        return $this->queries->show($filtros);
    }

    public function store(array $dados): array
    {
        DB::beginTransaction();

        try {

            $dadosDatabase = $this->formatarDatabase($dados);

            $retornoDatabase = $this->queries->store($dadosDatabase);

            if (!$retornoDatabase['sucesso']) {

                DB::rollBack();

                return [
                    'sucesso' => false,
                    'dados'   => [],
                    'erros'   => [$retornoDatabase['erros'][0] ?? 'Erro ao salvar fabricante.'],
                ];
            }

            DB::commit();

            return [
                'sucesso' => true,
                'dados'   => $retornoDatabase['dados'],
                'erros'   => [],
            ];
        } catch (\Throwable $th) {

            DB::rollBack();

            $this->logarErro([], formatarMensagemErro($th));

            return [
                'sucesso' => false,
                'dados'   => [],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }

    public function update(int $id, array $dados): array
    {
        DB::beginTransaction();

        try {

            $dadosDatabase = $this->formatarDatabase($dados);

            $retornoDatabase = $this->queries->update($id, $dadosDatabase);

            if (!$retornoDatabase['sucesso']) {

                DB::rollBack();

                return [
                    'sucesso' => false,
                    'dados'   => [],
                    'erros'   => [$retornoDatabase['erros'][0] ?? 'Erro ao atualizar fabricante.'],
                ];
            }

            DB::commit();

            return [
                'sucesso' => true,
                'dados'   => $retornoDatabase['dados'],
                'erros'   => [],
            ];
        } catch (\Throwable $th) {

            DB::rollBack();

            $this->logarErro(['id' => $id], formatarMensagemErro($th));

            return [
                'sucesso' => false,
                'dados'   => [],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }

    public function destroy(Fabricante $fabricante): array
    {
        try {

            DB::beginTransaction();

            $retornoDatabase = $this->queries->destroy($fabricante->id);

            if (!$retornoDatabase['sucesso']) {

                throw new \Exception($retornoDatabase['erros'][0] ?? 'Erro não identificado!');
            }

            session()->flash('mensagem_sucesso', 'Fabricante excluído com sucesso!');

            DB::commit();

            return [
                'sucesso' => true,
                'dados'   => [],
                'erros'   => [],
            ];
        } catch (\Throwable $th) {

            session()->flash('mensagem_erro', 'Erro ao excluir fabricante!');

            $this->logarErro(['id' => $fabricante->id], formatarMensagemErro($th));

            DB::rollBack();

            return [
                'sucesso' => false,
                'dados'   => [],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }

    private function formatarDatabase(array $dados): array
    {
        $mapa = [];

        if (array_key_exists('nome', $dados)) {
            $mapa['nome'] = $dados['nome'];
        }

        if (array_key_exists('descricao', $dados)) {
            $mapa['descricao'] = $dados['descricao'];
        }

        if (array_key_exists('ativo', $dados)) {
            $mapa['ativo'] = filter_var($dados['ativo'], FILTER_VALIDATE_BOOLEAN);
        }

        return $mapa;
    }

    public function logarErro(array $dados, string $mensagemErro): void
    {
        $id = $dados['id'] ?? '?';
        $mensagemFormatada = "Erro ao processar fabricante (id {$id}): {$mensagemErro}";

        Log::error(
            $mensagemFormatada,
            [
                'sucesso' => false,
                'dados'   => $dados,
                'erros'   => [$mensagemFormatada],
            ]
        );
    }
}
