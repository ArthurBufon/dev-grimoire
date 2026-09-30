import assert from 'node:assert/strict';
import test from 'node:test';

import {
  aplicarMascaraCnpj,
  aplicarMascaraCpf,
  aplicarMascaraDocumento,
  normalizarDocumento,
} from './documento.ts';

test('aplica máscara progressiva e completa de CPF', () => {
  assert.equal(aplicarMascaraCpf('1114'), '111.4');
  assert.equal(aplicarMascaraCpf('11144477735'), '111.444.777-35');
});

test('aplica máscara em CNPJ numérico e alfanumérico', () => {
  assert.equal(aplicarMascaraCnpj('00000000000191'), '00.000.000/0001-91');
  assert.equal(aplicarMascaraCnpj('12ABC34501DE35'), '12.ABC.345/01DE-35');
});

test('mascara e normaliza conforme o tipo informado', () => {
  assert.equal(aplicarMascaraDocumento('11144477735', 'cpf'), '111.444.777-35');
  assert.equal(normalizarDocumento('12.ABC.345/01DE-35', 'cnpj'), '12ABC34501DE35');
});
