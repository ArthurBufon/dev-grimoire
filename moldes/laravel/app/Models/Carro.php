<?php

declare(strict_types=1);

namespace App\Models;

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
    ];

    protected $casts = [
        'ano' => 'integer',
        'km'  => 'integer',
    ];
}
