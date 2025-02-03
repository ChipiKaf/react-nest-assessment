import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import Home from "./pages/home";
import Authentication from "./pages/authentication";
import ProtectedRoute from "./routes/protected.route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="auth" element={<Authentication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
