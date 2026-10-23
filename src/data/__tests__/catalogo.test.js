import { test, expect } from 'bun:test';
import { procedimentos, whatsappCatalogo } from '../catalogo';
import { catalogoIcones } from '../catalogoIcones';
test('only Laser Lavieen and Ultraformer MPT are featured', () => {
  expect(procedimentos.filter(p => p.destaque).map(p => p.nome)).toEqual(['Laser Lavieen', 'Ultraformer MPT']);
});
test('procedure contact uses the clinic number and exact catalog message', () => {
  const url = new URL(whatsappCatalogo('Laser Lavieen'));
  expect(url.pathname).toBe('/5513997846585');
  expect(url.searchParams.get('text')).toBe('Olá, Elizabeth! Vi o catálogo no site e gostaria de saber mais sobre Laser Lavieen.');
});
test('all thirteen procedures have an icon for every benefit', () => {
  expect(procedimentos.length).toBe(13);
  for (const p of procedimentos) expect(catalogoIcones[p.slug]?.beneficios.length).toBe(p.beneficios.length);
});
