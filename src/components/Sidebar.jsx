import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
//import LoginIcon from '@mui/icons-material/Login';
import { Link } from "react-router-dom";
import routes from "../routes/routes";

const Sidebar = () => {
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
              button="true"
              component={Link} // 直接指定 Link 为组件，且确保 Link 组件所需的道具正确传递
              to={route.path}
              key={index}
            >
              <ListItemIcon>
                {route.icon}
                {/* {route.name === "Home" && <HomeIcon />}
                {route.name === "Users" && <PersonIcon />}
                {route.name === "Settings" && <SettingsIcon />} */}
                {/* {route.name === 'Login' && <LoginIcon />}   */}
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
