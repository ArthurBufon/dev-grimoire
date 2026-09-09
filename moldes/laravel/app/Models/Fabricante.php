<?php

declare(strict_types=1);

namespace App\Models;

// ELOQUENT
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $nome
 * @property string|null $descricao
 * @property bool $ativo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Collection<int, Carro> $carros
 */
#[Fillable(['nome', 'descricao', 'ativo'])]
class Fabricante extends Model
{
    use HasFactory;

    protected $table = 'fabricantes';

    protected function casts(): array
    {
        return [
            'ativo' => 'boolean',
        ];
    }

    public function carros(): HasMany
    {
        return $this->hasMany(Carro::class);
    }
}
