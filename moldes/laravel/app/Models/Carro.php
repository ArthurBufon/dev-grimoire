<?php

declare(strict_types=1);

namespace App\Models;

// ENUMS
use App\Enums\Marca;
// ELOQUENT
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carro extends Model
{
    use HasFactory;

    protected $table = 'carros';

    protected $fillable = [
        'marca',
        'modelo',
        'ano',
        'cor',
        'placa',
        'km',
        'valor',
        'data_lancamento',
    ];

    protected $casts = [
        'marca'           => Marca::class,
        'ano'             => 'integer',
        'km'              => 'integer',
        'valor'           => 'decimal:2',
        'data_lancamento' => 'date',
    ];
}
