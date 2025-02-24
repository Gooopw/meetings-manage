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
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import mockMeetingRooms from "../assets/data/mockMeetingRooms";

const MeetingRooms = () => {
  const [rooms, setRooms] = useState(mockMeetingRooms);
  const [openDialog, setOpenDialog] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    capacity: "",
    location: "",
  });

  // 打开/关闭对话框
  const handleDialogOpen = (room = null) => {
    setEditRoom(room);
    setFormValues(
      room ? { ...room } : { name: "", capacity: "", location: "" }
    );
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
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
  };

  return (
    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>会议室管理</Typography>
      </div>

      {/* Add Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleDialogOpen()}
        style={{ marginBottom: "20px" }}
      >
        新增
      </Button>

      {/* Table */}
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>会议室名称</TableCell>
              <TableCell>会议室容量</TableCell>
              <TableCell>会议室位置</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.name}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.location}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDialogOpen(room)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(room.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{editRoom ? "编辑" : "新增"}</DialogTitle>
        <DialogContent>
          <TextField
            label="名称"
            fullWidth
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="容量"
            fullWidth
            name="capacity"
            type="number"
            value={formValues.capacity}
            onChange={handleInputChange}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="位置"
            fullWidth
            name="location"
            value={formValues.location}
            onChange={handleInputChange}
            style={{ marginBottom: "15px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="secondary"
            variant="contained"
          >
            取消
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MeetingRooms;
