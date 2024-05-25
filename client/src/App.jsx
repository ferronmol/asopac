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
import AssociationLayout from "./pages/AssociationLayout";
import AddAssociationInfoPage from "./pages/AddAssociationInfoPage";
import ProtectedRoute from "./ProtectedRoute";
import AboutPage from "./pages/AboutPage";
import ExternalDataPage from "./pages/ExternalDataPage";
//import ExternalDataPage from "./pages/ExternalDataPage";

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

            {/* Rutas de las asociaciónes */}
            <Route
              path="/association/:associationName"
              element={<AssociationLayout />}
            >
              <Route index element={<AssociationPage />} />
              <Route path="info" element={<AssociationPage />} />
              <Route path="add-info" element={<AddAssociationInfoPage />} />
              <Route path="external-data" element={<ExternalDataPage />} />

              {/* Rutas de usuarios  dentro de la asociacion*/}
              <Route
                path="users/register/:associationName"
                element={<RegisterUserPage />}
              />
              <Route path="users/register" element={<RegisterUserPage />} />
              <Route path="users/login" element={<LoginUserPage />} />
              <Route path="users/:username" element={<UserPage />} />
              <Route path="users/logout" element={<LogoutPage />} />
            </Route>

            {/* Rutas protegidas de la asociación y gestion de usuarios */}

            <Route element={<ProtectedRoute />}>
              <Route
                path="/association/:associationName"
                element={<AssociationPage />}
              />
              <Route path="/association/profile" element={<ProfilePage />} />
              <Route
                path="/association/:associationName/add-info"
                element={<AddAssociationInfoPage />}
              />

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
