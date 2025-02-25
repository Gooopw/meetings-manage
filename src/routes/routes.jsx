import Home from '../pages/Home';  
import Bookings from '../pages/Bookings';
import MeetingRooms from '../pages/MeetingRooms';  
import Users from '../pages/Users';  
import Settings from '../pages/Settings'; 
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AddTaskIcon from "@mui/icons-material/AddTask";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
//import Login from '../pages/Login';  

// 定义可配置的路由  
const routes = [  
    { path: '/', element: <Home />, name: '首页',icon: <HomeIcon /> },  
    //{ path: '/login', element: <Login />, name: 'Login' },  
    { path: '/bookings', element: <Bookings />, name: '会议预约',icon: <AddTaskIcon /> },  
    { path: '/meetingRooms', element: <MeetingRooms />, name: '会议室管理',icon: <MeetingRoomIcon /> },  
    { path: '/users', element: <Users />, name: '人员管理',icon: <PersonIcon /> },  
    { path: '/settings', element: <Settings />, name: '系统设置',icon: <SettingsIcon /> },  
];  

export default routes; 