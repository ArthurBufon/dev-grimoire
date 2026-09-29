<?php

declare(strict_types=1);

namespace App\Services\Carro;

// HELPERS
use App\Helpers\LogHelper;
// MODELS
use App\Models\Carro;
// QUERIES
use App\Queries\Carro\Queries;
// FACADES
use Illuminate\Support\Facades\DB;

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

                $mensagemErro = $retornoDatabase['erros'][0] ?? 'Erro ao salvar carro.';
                LogHelper::registrarErro([], $mensagemErro, 'Erro ao processar carro');

                return [
                    'sucesso' => false,
                    'dados'   => [],
                    'erros'   => [$mensagemErro],
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

            LogHelper::registrarErro([], formatarMensagemErro($th), 'Erro ao processar carro');

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

                $mensagemErro = $retornoDatabase['erros'][0] ?? 'Erro ao atualizar carro.';
                LogHelper::registrarErro(['id' => $id], $mensagemErro, 'Erro ao processar carro');

                return [
                    'sucesso' => false,
                    'dados'   => [],
                    'erros'   => [$mensagemErro],
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

            LogHelper::registrarErro(['id' => $id], formatarMensagemErro($th), 'Erro ao processar carro');

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

            LogHelper::registrarErro(['id' => $carro->id], formatarMensagemErro($th), 'Erro ao processar carro');

            DB::rollBack();

            return [
                'sucesso' => false,
                'dados'   => [],
                'erros'   => [formatarMensagemErro($th)],
            ];
        }
    }

    /**
     * Monta colunas persistíveis só com chaves enviadas na entrada.
     */
    private function formatarDatabase(array $dados): array
    {
        $mapa = [];

        if (array_key_exists('fabricante_id', $dados)) {
            $mapa['fabricante_id'] = (int) $dados['fabricante_id'];
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

        if (array_key_exists('valor', $dados)) {
            $mapa['valor'] = $dados['valor'];
        }

        if (array_key_exists('data_lancamento', $dados)) {
            $mapa['data_lancamento'] = $dados['data_lancamento'];
        }

        return $mapa;
    }

    /**
     * Placa em maiúsculas e sem espaços extras.
     */
    private function normalizarPlaca(string $placa): string
    {
        $semEspacos = preg_replace('/\s+/', '', trim($placa));

        return strtoupper($semEspacos ?? '');
    }

}
