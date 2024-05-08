import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AssociationPage from "./pages/AssociationPage";
import ProfilePage from "./pages/ProfilePage";
import LogoutPage from "./pages/LogoutPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import EditUserPage from "./pages/EditUserPage";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/association/register" element={<RegisterPage />} />
          <Route path="/association/login" element={<LoginPage />} />
          <Route path="/association/logout" element={<LogoutPage />} />

          {/* Rutas públicas de la asociación */}
          <Route
            path="/association/:associationName"
            element={<AssociationPage />}
          >
            {/* Rutas protegidas de la asociación y gestion de usuarios */}

            <ProtectedRoute
              path="/association/profile"
              element={<ProfilePage />}
            />
            <ProtectedRoute path="/users" element={<UserPage />} />
            <ProtectedRoute path="/users/:Id" element={<EditUserPage />} />
          </Route>

          {/* Rutas de usuarios */}
          <Route
            path="/users/register"
            element={<h1 className="text-center mt-5">Users Register</h1>}
          />
          <Route
            path="/users/login"
            element={<h1 className="text-center mt-5">Users Login</h1>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
