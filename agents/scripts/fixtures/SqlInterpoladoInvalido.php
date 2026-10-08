<?php

use Illuminate\Support\Facades\DB;

class SqlInterpoladoInvalido
{
    public function remover(int $id): void
    {
        DB::statement("DELETE FROM entidades WHERE id = $id");
    }
}
