import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Error from "./pages/Error.tsx";
import Library from "./pages/Library.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import useToken from "./hooks/useToken.ts";

const App = () => {
  const { authToken, setAuthToken } = useToken();
  const token = sessionStorage.getItem("authToken");
  if (!authToken && token) {
    setAuthToken(token);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SharedLayout authToken={authToken} setAuthToken={setAuthToken} />
          }
        >
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={
              <Login authToken={authToken} setAuthToken={setAuthToken} />
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute authToken={authToken}>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
