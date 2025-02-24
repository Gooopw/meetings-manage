import { useState } from "react";
import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import routes from "./routes/routes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const requireAuth = (element) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <Router>
      <Routes>
        {/* 登录页面不包含 Navbar 和 Sidebar */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* 包含导航和侧边栏的受保护路由 */}
        <Route
          path="/*"
          element={
            <div style={{ display: "flex", height: "100vh" }}>
              <Sidebar />
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Navbar />
                <Container
                  maxWidth="lg"
                  style={{
                    paddingTop: "64px",
                    flexGrow: 1, // 使容器扩展以填充剩余空间
                  }}
                >
                  <Routes>
                    {routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        element={requireAuth(route.element)} // 添加路由保护
                      />
                    ))}
                    {/* Catch all undefined routes and show 404 page */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Container>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
