import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<h1 className="text-center mt-5">Bienvenido a Asopac </h1>}
        />
        <Route
          path="/association/register"
          element={
            <h1 className="text-center mt-5">
              Página de registro de Asociaciones de Pacientes
            </h1>
          }
        />
        <Route
          path="/association/login"
          element={
            <h1 className="text-center mt-5">
              Página de acceso a su Asociacion de Pacientes
            </h1>
          }
        />
        <Route
          path="/association/profile"
          element={<h1 className="text-center mt-5">Profile</h1>}
        />
        <Route
          path="/association/logout"
          element={<h1 className="text-center mt-5">Logout</h1>}
        />
        <Route
          path="/users/register"
          element={<h1 className="text-center mt-5">User Register</h1>}
        />
        <Route
          path="/users/login"
          element={<h1 className="text-center mt-5">User Login</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
