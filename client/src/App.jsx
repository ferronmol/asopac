import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<h1 className="text-center mt-5">Bienvenido a Asopac </h1>}
          />
          <Route path="/association/register" element={<RegisterPage />} />
          <Route path="/association/login" element={<LoginPage />} />
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
            element={<h1 className="text-center mt-5">Users Register</h1>}
          />
          <Route
            path="/users/login"
            element={<h1 className="text-center mt-5">Users Login</h1>}
          />
          <Route
            path="/users/:id"
            element={<h1 className="text-center mt-5">Update User</h1>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
