<?php

declare(strict_types=1);

namespace App\Enums;

enum Marca: string
{
    case Toyota     = 'toyota';
    case Honda      = 'honda';
    case Volkswagen = 'volkswagen';
    case Fiat       = 'fiat';
    case Chevrolet  = 'chevrolet';
}
