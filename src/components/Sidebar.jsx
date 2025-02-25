import { useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
//import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, useLocation } from "react-router-dom";
import routes from "../routes/routes";

const Sidebar = () => {
  const navigate = useNavigate(); // 使用 useNavigate 钩子进行路由跳转
  const location = useLocation(); // 获取当前的路径
  const [selectedIndex, setSelectedIndex] = useState(
    routes.findIndex((route) => route.path === location.pathname)
  ); // 根据当前路径设置初始选中项

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index); // 更新选中项
    navigate(path); // 路由跳转
  };

  return (
    <Drawer
      variant="permanent"
      //anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          height: "100vh", // Sidebar 整个高度占满视口
          marginTop: "64px", // 留出 Topbar 高度空间
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {routes.map((route, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => handleListItemClick(index, route.path)} // 点击处理
              sx={{
                color: selectedIndex === index ? "#646cff" : "black", // 根据选中状态设置颜色
              }}
            >
              <ListItemButton>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
