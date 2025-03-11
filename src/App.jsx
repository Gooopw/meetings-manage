import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import routes from "./routes/routes";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // 从localStorage中获取登录状态
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    toast.success('登录成功！');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userInfo");
    toast.success('已安全退出登录');
  };

  const requireAuth = (element) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Toaster position="top-right" expand={true} richColors />
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
                <Navbar onLogout={handleLogout} />
                <Container
                  maxWidth={false} // 不限制最大宽度，容器将占满可用宽度
                  style={{
                    paddingTop: "64px",
                    flexGrow: 1, // 使容器扩展以填充剩余空间
                    paddingLeft: "20px", // 给内容一些左边距，避免紧挨侧边栏
                    paddingRight: "20px", // 右边距
                    width: "100%", // 让容器的宽度占满父元素
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
