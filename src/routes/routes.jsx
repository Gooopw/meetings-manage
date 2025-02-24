import Home from '../pages/Home';  
import Users from '../pages/Users';  
import Settings from '../pages/Settings'; 
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
//import Login from '../pages/Login';  

// 定义可配置的路由  
const routes = [  
    { path: '/', element: <Home />, name: 'Home',icon: <HomeIcon /> },  
    //{ path: '/login', element: <Login />, name: 'Login' },  
    { path: '/users', element: <Users />, name: 'Users',icon: <PersonIcon /> },  
    { path: '/settings', element: <Settings />, name: 'Settings',icon: <SettingsIcon /> },  
];  

export default routes; 