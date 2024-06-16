// simple.test.js
import { test } from "vitest";
import { expect } from "vitest";

// Función de aserción simple
function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Ejemplo de prueba
test("debe  sumar 1 + 1 y dar 2", () => {
  const result = 1 + 1;
  assert(result === 2, "Expected 1 + 1 to equal 2");
});

// Otra prueba simple
test(" debería verificar si la longitud del array es correcta", () => {
  const arr = [1, 2, 3];
  assert(arr.length === 3, "Expected array length to be 3");
});

// Ejecutar las pruebas
export { assert }; // Exporta la función assert si la necesitas fuera de este archivo

test("suma", () => {
  const result = 1 + 1;
  expect(result).toBe(2);
});
