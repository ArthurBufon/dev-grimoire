import assert from 'node:assert/strict';
import test from 'node:test';

import {
  extrairDecimalDoInput,
  formatarDinheiroParaReal,
} from './dinheiro.ts';

test('formata um valor decimal em reais sem dividi-lo por cem', () => {
  assert.equal(formatarDinheiroParaReal('1234.56'), 'R$ 1.234,56');
});

test('extrai da máscara um decimal com duas casas', () => {
  assert.equal(extrairDecimalDoInput('R$ 1.234,56'), '1234.56');
  assert.equal(extrairDecimalDoInput(''), '0.00');
});
