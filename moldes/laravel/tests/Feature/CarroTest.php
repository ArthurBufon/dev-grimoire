<?php

declare(strict_types=1);

namespace Tests\Feature;

// MODELS
use App\Models\Carro;
use App\Models\Fabricante;
// SERVICES
use App\Services\Carro\Service;
// TESTING
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CarroTest extends TestCase
{
    use RefreshDatabase;

    private Service $service;

    private Fabricante $fabricante;

    protected function setUp(): void
    {
        parent::setUp();

        $this->service = app(Service::class);

        $this->fabricante = Fabricante::create([
            'nome'  => 'Toyota',
            'ativo' => true,
        ]);
    }

    private function dadosCarro(array $sobrescrever = []): array
    {
        return array_merge([
            'fabricante_id'   => $this->fabricante->id,
            'modelo'          => 'Corolla',
            'ano'             => 2020,
            'cor'             => 'Prata',
            'placa'           => 'ABC1D23',
            'km'              => 10000,
            'valor'           => 80000.00,
            'data_lancamento' => '2024-01-15',
        ], $sobrescrever);
    }

    // INDEX

    public function test_index_retorna_lista_vazia(): void
    {
        $retorno = $this->service->index(['aplicar_paginacao' => false]);

        $this->assertTrue($retorno['sucesso']);
        $this->assertCount(0, $retorno['dados']['lista']);
        $this->assertEmpty($retorno['erros']);
    }

    public function test_index_ordena_por_id_quando_nao_recebe_ordenacao(): void
    {
        $primeiroCarro = Carro::create($this->dadosCarro(['placa' => 'AAA1A11']));
        $segundoCarro  = Carro::create($this->dadosCarro(['placa' => 'BBB2B22']));

        $retorno = $this->service->index(['aplicar_paginacao' => false]);

        $this->assertTrue($retorno['sucesso']);
        $this->assertSame(
            [$primeiroCarro->id, $segundoCarro->id],
            $retorno['dados']['lista']->pluck('id')->all(),
        );
        $this->assertEmpty($retorno['erros']);
    }

    public function test_index_filtra_por_fabricante_id(): void
    {
        $honda = Fabricante::create(['nome' => 'Honda', 'ativo' => true]);

        Carro::create($this->dadosCarro(['fabricante_id' => $this->fabricante->id, 'placa' => 'AAA1A11']));
        Carro::create($this->dadosCarro(['fabricante_id' => $honda->id, 'placa' => 'BBB2B22']));

        $retorno = $this->service->index([
            'fabricante_id'     => $this->fabricante->id,
            'aplicar_paginacao' => false,
        ]);

        $this->assertTrue($retorno['sucesso']);
        $this->assertCount(1, $retorno['dados']['lista']);
        $this->assertSame($this->fabricante->id, $retorno['dados']['lista']->first()->fabricante_id);
        $this->assertEmpty($retorno['erros']);
    }

    public function test_index_filtra_por_intervalo_data_lancamento(): void
    {
        Carro::create($this->dadosCarro(['placa' => 'AAA1A11', 'data_lancamento' => '2024-01-10']));
        Carro::create($this->dadosCarro(['placa' => 'BBB2B22', 'data_lancamento' => '2024-06-20']));

        $retorno = $this->service->index([
            'data_lancamento_inicio' => '2024-01-01',
            'data_lancamento_fim'    => '2024-02-01',
            'aplicar_paginacao'      => false,
        ]);

        $this->assertTrue($retorno['sucesso']);
        $this->assertCount(1, $retorno['dados']['lista']);
        $this->assertSame('AAA1A11', $retorno['dados']['lista']->first()->placa);
        $this->assertEmpty($retorno['erros']);
    }

    public function test_index_aplica_busca_geral_dentro_do_intervalo_data_lancamento(): void
    {
        Carro::create($this->dadosCarro([
            'placa'           => 'AAA1A11',
            'modelo'          => 'Corolla',
            'data_lancamento' => '2024-01-10',
        ]));
        Carro::create($this->dadosCarro([
            'placa'           => 'BBB2B22',
            'modelo'          => 'Corolla',
            'data_lancamento' => '2024-06-20',
        ]));

        $retorno = $this->service->index([
            'busca_geral'            => 'Corolla',
            'data_lancamento_inicio' => '2024-01-01',
            'data_lancamento_fim'    => '2024-02-01',
            'aplicar_paginacao'      => false,
        ]);

        $this->assertTrue($retorno['sucesso']);
        $this->assertCount(1, $retorno['dados']['lista']);
        $this->assertSame('AAA1A11', $retorno['dados']['lista']->first()->placa);
        $this->assertEmpty($retorno['erros']);
    }

    public function test_index_busca_geral_por_nome_do_fabricante(): void
    {
        Carro::create($this->dadosCarro(['placa' => 'AAA1A11']));
        Carro::create($this->dadosCarro([
            'fabricante_id' => Fabricante::create(['nome' => 'Honda', 'ativo' => true])->id,
            'placa'         => 'BBB2B22',
        ]));

        $retorno = $this->service->index([
            'busca_geral'       => 'Toyota',
            'aplicar_paginacao' => false,
        ]);

        $this->assertTrue($retorno['sucesso']);
        $this->assertCount(1, $retorno['dados']['lista']);
        $this->assertSame('AAA1A11', $retorno['dados']['lista']->first()->placa);
        $this->assertEmpty($retorno['erros']);
    }

    public function test_index_sem_paginacao_respeita_quantidade(): void
    {
        Carro::create($this->dadosCarro(['placa' => 'AAA1A11']));
        Carro::create($this->dadosCarro(['placa' => 'BBB2B22']));
        Carro::create($this->dadosCarro(['placa' => 'CCC3C33']));

        $retorno = $this->service->index([
            'aplicar_paginacao' => false,
            'quantidade'        => 2,
        ]);

        $this->assertTrue($retorno['sucesso']);
        $this->assertCount(2, $retorno['dados']['lista']);
        $this->assertSame(3, $retorno['dados']['paginacao']['total']);
        $this->assertSame(2, $retorno['dados']['paginacao']['total_retornado']);
        $this->assertArrayNotHasKey('pagina', $retorno['dados']['paginacao']);
        $this->assertEmpty($retorno['erros']);
    }

    // STORE

    public function test_store_cria_carro_com_sucesso(): void
    {
        $retorno = $this->service->store($this->dadosCarro());

        $this->assertTrue($retorno['sucesso']);
        $this->assertNotEmpty($retorno['dados']['id']);
        $this->assertEmpty($retorno['erros']);
        $this->assertDatabaseHas('carros', [
            'placa'         => 'ABC1D23',
            'fabricante_id' => $this->fabricante->id,
        ]);
    }

    public function test_store_falha_com_placa_duplicada(): void
    {
        $this->service->store($this->dadosCarro());

        $retorno = $this->service->store($this->dadosCarro());

        $this->assertFalse($retorno['sucesso']);
        $this->assertEmpty($retorno['dados']);
        $this->assertNotEmpty($retorno['erros']);
        $this->assertDatabaseCount('carros', 1);
    }

    // UPDATE

    public function test_update_atualiza_carro_com_sucesso(): void
    {
        $criar = $this->service->store($this->dadosCarro());
        $id    = $criar['dados']['id'];

        $retorno = $this->service->update($id, ['cor' => 'Preto']);

        $this->assertTrue($retorno['sucesso']);
        $this->assertSame('Preto', $retorno['dados']['model']->cor);
        $this->assertEmpty($retorno['erros']);
        $this->assertDatabaseHas('carros', [
            'id'  => $id,
            'cor' => 'Preto',
        ]);
    }

    public function test_update_falha_quando_id_inexistente(): void
    {
        $retorno = $this->service->update(99999, ['cor' => 'Preto']);

        $this->assertFalse($retorno['sucesso']);
        $this->assertEmpty($retorno['dados']);
        $this->assertNotEmpty($retorno['erros']);
    }

    // DESTROY

    public function test_destroy_exclui_carro_com_sucesso(): void
    {
        $criar = $this->service->store($this->dadosCarro());
        $carro = Carro::findOrFail($criar['dados']['id']);

        $retorno = $this->service->destroy($carro);

        $this->assertTrue($retorno['sucesso']);
        $this->assertEmpty($retorno['erros']);
        $this->assertDatabaseMissing('carros', ['id' => $carro->id]);
    }

    public function test_destroy_falha_quando_carro_ja_excluido(): void
    {
        $criar = $this->service->store($this->dadosCarro());
        $carro = Carro::findOrFail($criar['dados']['id']);

        $this->service->destroy($carro);

        $retorno = $this->service->destroy($carro);

        $this->assertFalse($retorno['sucesso']);
        $this->assertEmpty($retorno['dados']);
        $this->assertNotEmpty($retorno['erros']);
    }
}
