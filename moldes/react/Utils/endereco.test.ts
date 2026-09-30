import assert from 'node:assert/strict';
import test from 'node:test';

import {
  aplicarMascaraCep,
  cepValido,
  removerMascaraCep,
} from './endereco.ts';

test('limita o CEP a oito dígitos antes de aplicar a máscara', () => {
  assert.equal(aplicarMascaraCep('0131010099'), '01310-100');
});

test('aplica a máscara durante a digitação', () => {
  assert.equal(aplicarMascaraCep('01310a1'), '01310-1');
});

test('remove a máscara e valida a quantidade de dígitos', () => {
  assert.equal(removerMascaraCep('01310-100'), '01310100');
  assert.equal(cepValido('01310-100'), true);
  assert.equal(cepValido('01310-10'), false);
});
