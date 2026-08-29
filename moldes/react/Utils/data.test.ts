import assert from 'node:assert/strict';
import test from 'node:test';

import { dataLocalHoje, formatarParaView } from './data.ts';

test('formata uma data sem horário no mesmo dia informado', () => {
    assert.equal(formatarParaView('2026-08-26'), '26/08/2026');
});

test('retorna o fallback para data ausente', () => {
    assert.equal(formatarParaView(null, '-'), '-');
});

test('retorna a data local de hoje no formato de input date', () => {
    assert.match(dataLocalHoje(), /^\d{4}-\d{2}-\d{2}$/);
});
