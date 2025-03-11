import { useState,useEffect  } from "react";
import {
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import { Add,Search } from "@mui/icons-material";
import Pagination from "../components/Pagination";
import TableList from "../components/TableList";
import DialogForm from "../components/DialogForm";
import AlertBox from "../components/AlertBox";
import { toast } from 'sonner';
import "../assets/styles/meetingRooms.css";
import { fetchRooms, addRoom, updateRoom, deleteRoom } from "../services/meetingRoomsService";

const MeetingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formValues, setFormValues] = useState({
    title: "",
    capacity: "",
    devices: "",
    description: "",
    location: "",
  });
  const [editRoom, setEditRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);

  const columns = ["Title", "Capacity", "Devices", "Description", "Location"];

  // 获取会议室数据
  const loadRooms = async () => {
    try {
      const data = await fetchRooms();
      setRooms(data);  // 设置获取到的数据
    } catch (error) {
      setError("Failed to load rooms:"+error);
      toast.error('加载会议室数据失败');
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      loadRooms();
      return;
    }
    const filteredRooms = rooms.filter((room) =>
      room.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRooms(filteredRooms);
    if (filteredRooms.length === 0) {
      toast.info('未找到匹配的会议室');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handlePageChange = (_, newPage) => setPage(newPage);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDialogOpen = (room = null) => {
    setEditRoom(room);
    setFormValues(room ? { ...room } : { title: "", capacity: "", devices: "", description: "", location: "" });
    setOpenDialog(true);
  };

  const handleDialogClose = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { title, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formValues.title || !formValues.capacity) {
      toast.error('请填写会议室名称和容量');
      return;
    }
    try {
      let updatedRoom;
      if (editRoom) {
        updatedRoom = await updateRoom(editRoom.id, formValues);
        toast.success('会议室信息已更新');
      } else {
        updatedRoom = await addRoom(formValues);
        toast.success('会议室已创建');
      }
      setRooms((prev) => [...prev, updatedRoom]);
      handleDialogClose();
    } catch (error) {
      setError("Failed to save room:"+error);
      toast.error('保存会议室信息失败');
    }
  };

  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);
      setRooms(rooms.filter((room) => room.id !== roomId));
      toast.success('会议室已删除');
    } catch (error) {
      setError("Failed to delete room:"+error);
      toast.error('删除会议室失败');
    }
  };

  return (
    <div className="meeting-rooms">
      <Typography variant="h5" gutterBottom>
        会议室管理
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="10px">
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleDialogOpen()}>
          新增
        </Button>

        <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="搜索会议室"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <IconButton type="button" sx={{ p: "10px" }} onClick={handleSearch}>
            <Search />
          </IconButton>
        </Paper>
      </Box>

      <TableList
        rows={rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        columns={columns}
        onEdit={handleDialogOpen}
        onDelete={handleDelete}
      />

      <Pagination
        count={rooms.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <DialogForm
        open={openDialog}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        formValues={formValues}
        onChange={handleInputChange}
        title={editRoom ? "编辑会议室" : "新增会议室"}
      />

      <AlertBox open={error !== null} onClose={() => setError(null)} message={error} severity="error" />
    </div>
  );
};

export default MeetingRooms;