export function addition(a, b) {
  return a + b;
}

export function soustraction(a, b) {
  return a - b;
}

export function delayAddition(a, b, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(a + b), delay);
  });
}
