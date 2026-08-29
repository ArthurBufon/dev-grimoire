<?php

declare(strict_types=1);

namespace App\Models;

// ENUMS
use App\Enums\Marca;

// ELOQUENT
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['marca', 'modelo', 'ano', 'cor', 'placa', 'km', 'valor', 'data_lancamento'])]
class Carro extends Model
{
    use HasFactory;

    protected $table = 'carros';

    protected function casts(): array
    {
        return [
            'marca'           => Marca::class,
            'ano'             => 'integer',
            'km'              => 'integer',
            'valor'           => 'decimal:2',
            'data_lancamento' => 'date',
        ];
    }
}
