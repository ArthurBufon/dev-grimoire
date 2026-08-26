import assert from 'node:assert/strict';
import test from 'node:test';

import { formatarParaView } from './data.ts';

test('formata uma data sem horário no mesmo dia informado', () => {
    assert.equal(formatarParaView('2026-08-26'), '26/08/2026');
});
