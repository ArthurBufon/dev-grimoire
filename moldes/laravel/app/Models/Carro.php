<?php

declare(strict_types=1);

namespace App\Models;

// ELOQUENT
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $fabricante_id
 * @property string $modelo
 * @property int $ano
 * @property string|null $cor
 * @property string $placa
 * @property int $km
 * @property string $valor
 * @property Carbon|null $data_lancamento
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Fabricante $fabricante
 */
#[Fillable(['fabricante_id', 'modelo', 'ano', 'cor', 'placa', 'km', 'valor', 'data_lancamento'])]
class Carro extends Model
{
    use HasFactory;

    protected $table = 'carros';

    protected function casts(): array
    {
        return [
            'fabricante_id'   => 'integer',
            'ano'             => 'integer',
            'km'              => 'integer',
            'valor'           => 'decimal:2',
            'data_lancamento' => 'date',
        ];
    }

    public function fabricante(): BelongsTo
    {
        return $this->belongsTo(Fabricante::class);
    }
}
