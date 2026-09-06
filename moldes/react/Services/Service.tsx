// TIPOS
import type { Carro } from '@/types/carro';

export class Service {

    static adicionarNaLista(carro: Carro, listaAntiga: Carro[]): Carro[] {

        let listaAtualizada: Carro[] = [];

        const existe = listaAntiga.find(item => item.id === carro.id);

        // Adiciona na lista.
        if (!existe) {

            listaAtualizada = [...listaAntiga, carro];
        }
        // Já existe, não faz nada.
        else {

            listaAtualizada = [...listaAntiga];
        }

        return listaAtualizada;
    }

    static atualizarNaLista(carro: Carro, listaAntiga: Carro[]): Carro[] {

        const listaAtualizada = listaAntiga.map(item => {

            if (item.id === carro.id) {

                return carro;
            }

            return item;
        });

        return listaAtualizada;
    }

    static removerDaLista(carroId: number, listaAntiga: Carro[]): Carro[] {

        const listaAtualizada = listaAntiga.filter(item => item.id !== carroId);

        return listaAtualizada;
    }

    static buscarPorId(carroId: number, lista: Carro[]): Carro | null {

        const carro = lista.find(item => item.id === carroId);

        if (!carro) {

            return null;
        }

        return carro;
    }

    static montarNomeCompleto(carro: Carro): string {

        const nomeCompleto = `${carro.marca} ${carro.modelo} ${carro.ano}`;

        return nomeCompleto;
    }
}
