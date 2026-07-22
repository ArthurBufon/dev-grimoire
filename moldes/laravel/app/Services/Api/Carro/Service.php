<?php

declare(strict_types=1);

namespace App\Services\Api\Carro;

use App\Models\Carro;
use App\Queries\Carro\Queries;
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

            $dadosDatabase = $this->dadosDatabase($dados);

            $retornoDatabase = $this->queries->store($dadosDatabase);

            if (!$retornoDatabase['sucesso']) {

                DB::rollBack();

                return [
                    'sucesso' => false,
                    'dados'   => [],
                    'erros'   => [$retornoDatabase['erros'][0] ?? 'Erro ao salvar carro.'],
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

            $dadosDatabase = $this->formatarDatabae($dados);

            $retornoDatabase = $this->queries->update($id, $dadosDatabase);

            if (!$retornoDatabase['sucesso']) {

                DB::rollBack();

                return [
                    'sucesso' => false,
                    'dados'   => [],
                    'erros'   => [$retornoDatabase['erros'][0] ?? 'Erro ao atualizar carro.'],
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

            return [
                'sucesso' => false,
                'dados'   => [],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }

    public function destroy(Carro $carro): array
    {
        try {

            DB::beginTransaction();

            $retornoDatabase = $this->queries->destroy($carro->id);

            if (!$retornoDatabase['sucesso']) {

                throw new \Exception($retornoDatabase['erros'][0] ?? 'Erro não identificado!');
            }

            DB::commit();

            return [
                'sucesso' => true,
                'dados'   => [],
                'erros'   => [],
            ];
        } catch (\Throwable $th) {

            $this->logarErro(['id' => $carro->id], formatarMensagemErro($th));

            DB::rollBack();

            return [
                'sucesso' => false,
                'dados'   => [],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }

    private function formatarDatabae(array $dados): array
    {
        $mapa = [];

        if (array_key_exists('marca', $dados)) {
            $mapa['marca'] = $dados['marca'];
        }

        if (array_key_exists('modelo', $dados)) {
            $mapa['modelo'] = $dados['modelo'];
        }

        if (array_key_exists('ano', $dados)) {
            $mapa['ano'] = (int) $dados['ano'];
        }

        if (array_key_exists('cor', $dados)) {
            $mapa['cor'] = $dados['cor'];
        }

        if (array_key_exists('placa', $dados)) {
            $mapa['placa'] = $this->normalizarPlaca((string) $dados['placa']);
        }

        if (array_key_exists('km', $dados)) {
            $mapa['km'] = (int) $dados['km'];
        }

        return $mapa;
    }

    private function normalizarPlaca(string $placa): string
    {
        $semEspacos = preg_replace('/\s+/', '', trim($placa));

        return strtoupper($semEspacos ?? '');
    }

    public function logarErro(array $dados, string $mensagemErro): void
    {
        $id = $dados['id'] ?? '?';
        $mensagemFormatada = "Erro API carro (id {$id}): {$mensagemErro}";

        Log::error(
            $mensagemFormatada,
            [
                'sucesso' => 'false',
                'dados'   => $dados,
                'erros'   => [$mensagemFormatada],
            ]
        );
    }
}
