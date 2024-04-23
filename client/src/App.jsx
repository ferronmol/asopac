import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<h1 className="text-center mt-5">Welcome to Asopac </h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
