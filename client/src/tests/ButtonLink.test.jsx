// Importamos las funciones necesarias de vitest y testing-library
import { test } from "vitest";
import { expect } from "vitest";
import { screen, render } from "@testing-library/react";
import ButtonLink from "../components/common/ButtonLink";
import { MemoryRouter } from "react-router-dom";

// Prueba 1: Renderización como enlace (link)
test("debe renderizar correctamente como enlace", () => {
  render(
    <MemoryRouter>
      <ButtonLink text="Iniciar sesión" to="/login" type="link" />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole("link", { name: "Iniciar sesión" });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "/login");
});

// Prueba 2: Renderización como botón (button)
test("debe renderizar correctamente como botón", () => {
  render(<ButtonLink text="Submit" type="button" />);

  const buttonElement = screen.getByRole("button", { name: "Submit" });
  expect(buttonElement).toBeInTheDocument();
});

// Prueba 3: Verificación de atributos para link
test("debe tener atributos correctos para link", () => {
  render(
    <MemoryRouter>
      <ButtonLink text="Iniciar sesión" to="/login" type="link" />
    </MemoryRouter>
  );

  const linkElement = screen.getByRole("link", { name: "Iniciar sesión" });
  expect(linkElement).toHaveAttribute("href", "/login");
  expect(linkElement.textContent).toBe("Iniciar sesión");
});

// Prueba 4: Estilos y clases CSS
test("debe tener las clases CSS correctas", () => {
  render(<ButtonLink text="Submit" type="button" />);

  const buttonElement = screen.getByRole("button", { name: "Submit" });
  expect(buttonElement).toHaveClass(
    "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2"
  );
});

// Ejecutamos todas las pruebas
export { test };
