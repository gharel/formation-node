**démonstration simple de tests unitaires avec Jest**, un framework de test JavaScript populaire.

---

## Objectif

Montrer comment écrire et exécuter des **tests unitaires** avec **Jest** en utilisant un exemple concret.

---

## Étapes de la démonstration

### 1. Prérequis

- Node.js installé (https://nodejs.org/)
- Un terminal

---

### 2. Créer un projet Node.js

```bash
mkdir demo-jest
cd demo-jest
npm init -y # crée un package.json sans poser les questions
```

---

### 3. Installer Jest

```bash
npm install --save-dev jest
```

---

### 4. Créer un fichier avec une fonction à tester

Crée un fichier `calcul.mjs` :

```javascript
export function addition(a, b) {
  return a + b;
}

export function soustraction(a, b) {
  return a - b;
}
```

---

### 5. Créer le fichier de test

Crée un fichier `calcul.test.mjs` :

```javascript
import { addition, soustraction } from './calcul.mjs';

test('addition de 2 + 3 devrait être 5', () => {
  expect(addition(2, 3)).toBe(5);
});

test('soustraction de 10 - 4 devrait être 6', () => {
  expect(soustraction(10, 4)).toBe(6);
});

test('addition de valeurs négatives', () => {
  expect(addition(-1, -2)).toBe(-3);
});
```

---

### 6. Configurer `package.json` pour utiliser Jest

Ajoute ou modifie les lignes `"test"` et `"type"` dans `package.json` :

```json
{
  "scripts": {
    "test": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js"
  },

  "type": "module",
}
```

---

### 7. Exécuter les tests

```bash
npm test
```

Tu devrais voir une sortie comme :

```
✓ addition de 2 + 3 devrait être 5
✓ soustraction de 10 - 4 devrait être 6
✓ addition de valeurs négatives

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

---

## Explication des méthodes utilisées

- `test()` : Définit un test unitaire.
- `expect()` : Vérifie une valeur.
- `.toBe()` : Comparateur (matcher) qui vérifie l’égalité stricte (`===`).

---

## Astuce : Mise à jour automatique

Ajoute la ligne `"watch"` dans `package.json` :

```json
"watch": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --watch"
```

Pour relancer les tests à chaque modification :

```bash
npm run watch
```

---

## Bonus : Tester une fonction asynchrone

Ajoute cette fonction dans `calcul.mjs` :

```javascript
export function delayAddition(a, b, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, delay);
  });
}
```

Puis dans `calcul.test.mjs` :

```javascript
test('delayAddition doit résoudre avec 7 après 100ms', async () => {
  const resultat = await delayAddition(3, 4, 100);
  expect(resultat).toBe(7);
});
```

---

## Références utiles

- [Documentation officielle de Jest](https://jestjs.io/)
