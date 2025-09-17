import { addition, soustraction, delayAddition } from './calcul.mjs';

test('addition de 2 + 3 devrait être 5', () => {
  expect(addition(2, 3)).toBe(5);
});

test('soustraction de 10 - 4 devrait être 6', () => {
  expect(soustraction(10, 4)).toBe(6);
});

test('addition de valeurs négatives', () => {
  expect(addition(-1, -2)).toBe(-3);
});

test('delayAddition doit résoudre avec 7 après 100ms', async () => {
  const resultat = await delayAddition(3, 4, 100);
  expect(resultat).toBe(7);
});
