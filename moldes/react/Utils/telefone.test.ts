import assert from 'node:assert/strict';
import test from 'node:test';

import {
  aplicarMascaraTelefone,
  normalizarTelefoneColado,
} from './telefone.ts';

test('remove o código do Brasil ao colar um telefone internacional', () => {
  assert.equal(
    normalizarTelefoneColado('+55 11 98765-4321'),
    '(11) 98765-4321',
  );
});

test('preserva um telefone local com DDD 55', () => {
  assert.equal(normalizarTelefoneColado('55 98765-4321'), '(55) 98765-4321');
});

test('aplica máscaras de telefone fixo e celular', () => {
  assert.equal(aplicarMascaraTelefone('1133334444'), '(11) 3333-4444');
  assert.equal(aplicarMascaraTelefone('11987654321'), '(11) 98765-4321');
});
