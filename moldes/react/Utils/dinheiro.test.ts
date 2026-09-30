import assert from 'node:assert/strict';
import test from 'node:test';

import {
  centavosParaDecimal,
  extrairDecimalDoInput,
  formatarCentavos,
  formatarDinheiroParaReal,
  valorParaCentavos,
} from './dinheiro.ts';

test('formata um valor decimal em reais sem dividi-lo por cem', () => {
  assert.equal(formatarDinheiroParaReal('1234.56'), 'R$ 1.234,56');
});

test('extrai da máscara um decimal com duas casas', () => {
  assert.equal(extrairDecimalDoInput('R$ 1.234,56'), '1234.56');
  assert.equal(extrairDecimalDoInput(''), '0.00');
});

test('soma valores monetários em centavos sem erro de ponto flutuante', () => {
  const total = valorParaCentavos('10.10') + valorParaCentavos('20.20');

  assert.equal(total, 3030);
  assert.equal(centavosParaDecimal(total), '30.30');
  assert.equal(formatarCentavos(total), 'R$ 30,30');
});
