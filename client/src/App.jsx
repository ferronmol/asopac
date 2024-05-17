import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AssociationPage from "./pages/AssociationPage";
import ProfilePage from "./pages/ProfilePage";
import LogoutPage from "./pages/LogoutPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/userPages/UserPage";
import RegisterUserPage from "./pages/userPages/RegisterUserPage";
import LoginUserPage from "./pages/userPages/LoginUserPage";

import ProtectedRoute from "./ProtectedRoute";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/association/register" element={<RegisterPage />} />
            <Route path="/association/login" element={<LoginPage />} />
            <Route path="/association/logout" element={<LogoutPage />} />
            <Route path="/association/about" element={<AboutPage />} />
            {/* Rutas públicas y privadas de las asociaciónes */}
            <Route
              path="/association/:associationName"
              element={<AssociationPage />}
            />
            {/* Rutas públicas de usuarios */}
            <Route path="/users/register" element={<RegisterUserPage />} />
            <Route path="/users/login" element={<LoginUserPage />} />
            <Route path="/users/:username" element={<UserPage />} />

            {/* Rutas protegidas de la asociación y gestion de usuarios */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/association/:associationName"
                element={<AssociationPage />}
              />
              <Route path="/association/profile" element={<ProfilePage />} />
              {/* <Route path="/users" element={<UserPage />} />
              <Route path="/users/:Id" element={<UserPage />} />*/}
            </Route>

            {/* ruta de catch-all */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
