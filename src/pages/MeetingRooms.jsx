import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  InputBase,
} from "@mui/material";
import { Add, Edit, Delete,Save,Cancel } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogBox from "../components/DialogBox";
import AlertBox from "../components/AlertBox";
import mockMeetingRooms from "../assets/data/mockMeetingRooms";

const MeetingRooms = () => {
  const [rooms, setRooms] = useState(mockMeetingRooms);
  const [openEditRoom, setOpenEditRoom] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
  const [deleteRoom, setDeleteRoom] = useState(null); 
  const [deleteAlert, setDeleteAlert] = useState({ open: false, message: "", severity: "" });
  const [editRoom, setEditRoom] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    capacity: "",
    devices: "",
    description: "",
    location: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // 搜索关键词

  // 打开/关闭对话框
  const handleDialogOpen = (room = null) => {
    setEditRoom(room);
    setFormValues(
      room
        ? { ...room }
        : { name: "", capacity: "", devices: "", description: "", location: "" }
    );
    setOpenEditRoom(true);
  };

  const handleDialogClose = () => {
    setOpenEditRoom(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 提交表单
  const handleSubmit = () => {
    if (editRoom) {
      // 编辑会议室
      setRooms((prev) =>
        prev.map((room) =>
          room.id === editRoom.id ? { ...editRoom, ...formValues } : room
        )
      );
    } else {
      // 新增会议室
      const newRoom = {
        id: rooms.length + 1,
        ...formValues,
      };
      setRooms((prev) => [...prev, newRoom]);
    }
    handleDialogClose();
  };

// 删除会议室
const handleDelete = (id) => {
  setRooms((prev) => prev.filter((room) => room.id !== id));
  setOpenDeleteDialog(false);

  setDeleteAlert({
    open: true,
    message: "会议室删除成功！",
    severity: "success",
  });
};

const handleDeleteDialogOpen = (room) => {
  setOpenDeleteDialog(true);
  setDeleteRoom(room);
};

const handleDeleteDialogClose = () => {
  setOpenDeleteDialog(false);
};

const handleDeleteAlertClose = () => {
  setDeleteAlert((prev) => ({ ...prev, open: false }));
};

  // 处理搜索输入变化
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 搜索处理函数
  const handleSearch = () => {
    if (searchTerm === "") {
      setRooms(mockMeetingRooms);
      return;
    }
    const filteredRooms = mockMeetingRooms.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setRooms(filteredRooms); // 更新显示的会议室列表

  };

  return (
    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
      <div
        style={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}
      >
        <Typography variant="h5" gutterBottom>
          会议室管理
        </Typography>
      </div>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="10px">
        {/* Add Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleDialogOpen()}
        >
          新增
        </Button>

        {/* Search Input */}
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="搜索会议室"
            aria-label="搜索会议室"
            value={searchTerm}  
            onChange={handleSearchChange}  
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={handleSearch} >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名称</TableCell>
              <TableCell>容量</TableCell>
              <TableCell>设备</TableCell>
              <TableCell>描述</TableCell>
              <TableCell>位置</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.devices}</TableCell>
                <TableCell>{room.description}</TableCell>
                <TableCell>{room.location}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDialogOpen(room)}>
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteDialogOpen(room)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 删除确认对话框 */}
      <DialogBox
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={() => handleDelete(deleteRoom?.id)}
        title="确认删除"
        message={`您确定要删除会议室：${deleteRoom?.name} 吗？`}
        confirmText="删除"
        cancelText="取消"
        confirmIcon={<DeleteIcon />}
        cancelIcon={<Cancel />}
      />

      {/* 删除成功提示 */}
      <AlertBox
        open={deleteAlert.open}
        onClose={handleDeleteAlertClose}
        message={deleteAlert.message}
        severity={deleteAlert.severity}
      />

      {/* Dialog for Add/Edit */}
      <Dialog open={openEditRoom} onClose={handleDialogClose}>
        <DialogTitle>{editRoom ? "编辑" : "新增"}</DialogTitle>
        <DialogContent>
          <TextField
            label="会议室名称"
            fullWidth
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="会议室容量"
            fullWidth
            name="capacity"
            type="number"
            value={formValues.capacity}
            onChange={handleInputChange}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="所在位置"
            fullWidth
            name="location"
            value={formValues.location}
            onChange={handleInputChange}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="会议室设备"
            fullWidth
            name="devices"
            value={formValues.devices}
            onChange={handleInputChange}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="会议室描述"
            fullWidth
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            style={{ marginBottom: "15px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleDialogClose} color="secondary" variant="contained" startIcon={<Cancel />} >
            取消
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained" startIcon={<Save />}>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MeetingRooms;
