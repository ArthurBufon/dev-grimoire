<?php

use App\Http\Requests\Entidade\StoreRequest;

class RequestAllInvalidoController
{
    public function store(StoreRequest $request): array
    {
        return $this->service->store($request->all());
    }
}
