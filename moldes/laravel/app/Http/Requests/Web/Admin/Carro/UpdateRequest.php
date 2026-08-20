<?php

declare(strict_types=1);

namespace App\Http\Requests\Web\Admin\Carro;

// ENUMS
use App\Enums\Marca;
// HTTP
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
// VALIDATION
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('placa')) {
            $placa = preg_replace('/\s+/', '', trim((string) $this->input('placa')));

            $this->merge([
                'placa' => strtoupper($placa ?? ''),
            ]);
        }
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $carro = $this->route('carro');

        return [
            'marca'  => ['required', Rule::enum(Marca::class)],
            'modelo' => ['required', 'string', 'max:120'],
            'ano'    => ['required', 'integer', 'min:1900', 'max:2100'],
            'cor'    => ['nullable', 'string', 'max:40'],
            'placa'  => [
                'required',
                'string',
                'max:10',
                Rule::unique('carros', 'placa')->ignore($carro?->id),
            ],
            'km'              => ['required', 'integer', 'min:0'],
            'valor'           => ['required', 'numeric', 'min:0'],
            'data_lancamento' => ['nullable', 'date'],
        ];
    }
}
