<?php

declare(strict_types=1);

namespace Tests\Feature;

// MODELS
use App\Models\Fabricante;
// SERVICES
use App\Services\Fabricante\Service;
// TESTING
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FabricanteTest extends TestCase
{
    use RefreshDatabase;

    private Service $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->service = app(Service::class);
    }

    private function dadosFabricante(array $sobrescrever = []): array
    {
        return array_merge([
            'nome'      => 'Toyota',
            'descricao' => 'Fabricante japonês',
            'ativo'     => true,
        ], $sobrescrever);
    }

    public function test_index_retorna_lista_vazia(): void
    {
        $retorno = $this->service->index(['aplicar_paginacao' => false]);

        $this->assertTrue($retorno['sucesso']);
        $this->assertCount(0, $retorno['dados']['lista']);
        $this->assertEmpty($retorno['erros']);
    }

    public function test_index_filtra_por_nome(): void
    {
        Fabricante::create($this->dadosFabricante(['nome' => 'Toyota']));
        Fabricante::create($this->dadosFabricante(['nome' => 'Honda']));

        $retorno = $this->service->index([
            'nome'              => 'Toyota',
            'aplicar_paginacao' => false,
        ]);

        $this->assertTrue($retorno['sucesso']);
        $this->assertCount(1, $retorno['dados']['lista']);
        $this->assertSame('Toyota', $retorno['dados']['lista']->first()->nome);
        $this->assertEmpty($retorno['erros']);
    }

    public function test_store_cria_fabricante_com_sucesso(): void
    {
        $retorno = $this->service->store($this->dadosFabricante());

        $this->assertTrue($retorno['sucesso']);
        $this->assertNotEmpty($retorno['dados']['id']);
        $this->assertEmpty($retorno['erros']);
        $this->assertDatabaseHas('fabricantes', [
            'nome' => 'Toyota',
        ]);
    }

    public function test_store_falha_com_nome_duplicado(): void
    {
        $this->service->store($this->dadosFabricante());

        $retorno = $this->service->store($this->dadosFabricante());

        $this->assertFalse($retorno['sucesso']);
        $this->assertEmpty($retorno['dados']);
        $this->assertNotEmpty($retorno['erros']);
        $this->assertDatabaseCount('fabricantes', 1);
    }

    public function test_update_atualiza_fabricante_com_sucesso(): void
    {
        $criar = $this->service->store($this->dadosFabricante());
        $id    = $criar['dados']['id'];

        $retorno = $this->service->update($id, ['descricao' => 'Atualizado']);

        $this->assertTrue($retorno['sucesso']);
        $this->assertSame('Atualizado', $retorno['dados']['model']->descricao);
        $this->assertEmpty($retorno['erros']);
        $this->assertDatabaseHas('fabricantes', [
            'id'        => $id,
            'descricao' => 'Atualizado',
        ]);
    }

    public function test_destroy_exclui_fabricante_com_sucesso(): void
    {
        $criar     = $this->service->store($this->dadosFabricante());
        $fabricante = Fabricante::findOrFail($criar['dados']['id']);

        $retorno = $this->service->destroy($fabricante);

        $this->assertTrue($retorno['sucesso']);
        $this->assertEmpty($retorno['erros']);
        $this->assertDatabaseMissing('fabricantes', ['id' => $fabricante->id]);
    }
}
