import { test } from "vitest";
import { render } from "@testing-library/react";
import ButtonLink from "../components/common/ButtonLink";
import { MemoryRouter } from "react-router-dom";

test("debe renderizar el componente ButtonLink", () => {
  const { container } = render(
    <MemoryRouter>
      <ButtonLink text="Iniciar sesión" to="/login" type="link" />
    </MemoryRouter>
  );

  // Verificar si el componente se renderizó correctamente
  const linkElement = container.querySelector("a");
  if (!linkElement) {
    throw new Error("No se encontró el elemento <a>");
  }
  if (linkElement.getAttribute("href") !== "/login") {
    throw new Error("Atributo href del Link incorrecto");
  }
  if (linkElement.textContent !== "Iniciar sesión") {
    throw new Error("Texto del Link incorrecto");
  }

  // Si llegamos aquí, todas las aserciones han pasado correctamente
  console.log("¡Todas las pruebas pasaron!");
});
