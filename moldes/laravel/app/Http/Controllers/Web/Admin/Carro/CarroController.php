<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web\Admin\Carro;

// CONTROLLERS
use App\Http\Controllers\Controller;
// FORM REQUESTS
use App\Http\Requests\Web\Admin\Carro\StoreRequest;
use App\Http\Requests\Web\Admin\Carro\UpdateRequest;
// MODELS
use App\Models\Carro;
// SERVICES
use App\Services\Carro\Service;
use App\Services\Carro\View\Service as ViewService;
// HTTP
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
// INERTIA
use Inertia\Inertia;
use Inertia\Response;

class CarroController extends Controller
{
    public function __construct(
        private Service $service,
        private ViewService $viewService,
    ) {
        //
    }

    public function index(Request $request): Response
    {
        $dadosView = $this->viewService->index([
            'view'    => 'index',
            'filtros' => $request->only(['busca_geral', 'quantidade', 'pagina']),
        ]);

        return Inertia::render('Carro/Index', $dadosView);
    }

    public function create(): Response
    {
        $dadosView = $this->viewService->index(['view' => 'create']);

        return Inertia::render('Carro/Create', $dadosView);
    }

    public function store(StoreRequest $request): RedirectResponse
    {
        $retorno = $this->service->store($request->validated());

        if (!$retorno['sucesso']) {
            return back()->withErrors(['geral' => $retorno['erros'][0]]);
        }

        Inertia::flash('toast', [
            'type'    => 'success',
            'message' => 'Carro criado com sucesso.',
        ]);

        return redirect()->route('admin.carros.index');
    }

    public function edit(Carro $carro): Response
    {
        $dadosView = $this->viewService->index([
            'view'  => 'edit',
            'carro' => $carro,
        ]);

        return Inertia::render('Carro/Edit', $dadosView);
    }

    public function update(UpdateRequest $request, Carro $carro): RedirectResponse
    {
        $retorno = $this->service->update($carro->id, $request->validated());

        if (!$retorno['sucesso']) {
            return back()->withErrors(['geral' => $retorno['erros'][0]]);
        }

        Inertia::flash('toast', [
            'type'    => 'success',
            'message' => 'Carro atualizado com sucesso.',
        ]);

        return redirect()->route('admin.carros.index');
    }

    public function destroy(Carro $carro): RedirectResponse
    {
        $retorno = $this->service->destroy($carro);

        if (!$retorno['sucesso']) {
            return back()->withErrors(['geral' => $retorno['erros'][0]]);
        }

        Inertia::flash('toast', [
            'type'    => 'success',
            'message' => 'Carro excluído com sucesso.',
        ]);

        return redirect()->route('admin.carros.index');
    }
}
