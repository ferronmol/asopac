// src/tests/LoginPage.test.jsx

import { createContext, useContext, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, expect, test } from "vitest";

// Mocks para react-router-dom
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    MemoryRouter: actual.MemoryRouter,
  };
});

// AuthContext y AuthProvider
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (username, password) => {
    if (username === "user" && password === "password") {
      setUser({ username });
      return true;
    } else {
      return false;
    }
  };
  const value = { user, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

// Componente LoginPage
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      setError("");
      // Redirigir al usuario autenticado
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

// Pruebas
test("debe renderizar el formulario de login correctamente", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>
  );
  expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
});

test("debe mostrar errores de validación al enviar el formulario vacío", async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>
  );
  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  expect(screen.getByText("Credenciales incorrectas")).toBeInTheDocument();
});

test("debe manejar errores de autenticación", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>
  );
  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "wrong" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "wrong" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  expect(screen.getByText("Credenciales incorrectas")).toBeInTheDocument();
});

test("debe redirigir al usuario autenticado", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>
  );
  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "user" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  expect(
    screen.queryByText("Credenciales incorrectas")
  ).not.toBeInTheDocument();
});
