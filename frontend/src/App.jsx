import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function Logout() {
  localStorage.clear(); // Clear access and refresh tokens
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear(); // Clear any lingering tokens before registration
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected route for the Home page: only accessible if authorized */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />

        {/* Catch-all route for undefined paths*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
