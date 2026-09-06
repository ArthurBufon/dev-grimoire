import assert from 'node:assert/strict';
import test from 'node:test';

import { somenteNumeros } from './index.ts';

test('retorna nulo quando não há dígitos', () => {
    assert.equal(somenteNumeros('abc'), null);
});

test('converte apenas os dígitos informados', () => {
    assert.equal(somenteNumeros('R$ 1.234'), 1234);
});
