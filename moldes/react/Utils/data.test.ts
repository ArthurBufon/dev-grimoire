import assert from 'node:assert/strict';
import test from 'node:test';

import {
    dataLocalHoje,
    formatarDataHoraLocal,
    formatarParaView,
    parsearDataHoraLocal,
    somarMinutosDataHoraLocal,
} from './data.ts';

test('formata uma data sem horário no mesmo dia informado', () => {
    assert.equal(formatarParaView('2026-08-26'), '26/08/2026');
});

test('retorna o fallback para data ausente', () => {
    assert.equal(formatarParaView(null, '-'), '-');
});

test('retorna a data local de hoje no formato de input date', () => {
    assert.match(dataLocalHoje(), /^\d{4}-\d{2}-\d{2}$/);
});

test('formata uma data para input datetime-local', () => {
    assert.equal(
        formatarDataHoraLocal(new Date(2026, 7, 26, 14, 30)),
        '2026-08-26T14:30',
    );
});

test('converte um valor de input datetime-local para data local', () => {
    const data = parsearDataHoraLocal('2026-08-26T14:30');

    assert.equal(data?.getFullYear(), 2026);
    assert.equal(data?.getMonth(), 7);
    assert.equal(data?.getDate(), 26);
    assert.equal(data?.getHours(), 14);
    assert.equal(data?.getMinutes(), 30);
});

test('retorna nulo para datetime-local incompleto', () => {
    assert.equal(parsearDataHoraLocal('2026-08-26'), null);
});

test('retorna nulo para datetime-local inexistente', () => {
    assert.equal(parsearDataHoraLocal('2026-02-30T14:30'), null);
});

test('soma minutos em uma data local', () => {
    assert.equal(
        somarMinutosDataHoraLocal('2026-08-26T23:45', 30),
        '2026-08-27T00:15',
    );
});
