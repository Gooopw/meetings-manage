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
import "../assets/styles/users.css";
import { fetchUsers, addUser, updateUser, deleteUser } from "../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formValues, setFormValues] = useState({
    name: "",
    age: null,
    email: "",
    gender: "",
    phone: "",
    address: "",
  });
  const [editUser, setEditUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);

  const columns = ["Name", "Age", "Email", "Gender", "Phone", "Address"];

  // 获取会议室数据
  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      console.log("data:");
      console.log(data);
      setUsers(data);  // 设置获取到的数据
    } catch (error) {
      setError("Failed to load users:"+error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = () => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filteredUsers);
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

  const handleDialogOpen = (user = null) => {
    setEditUser(user);
    setFormValues(user ? { ...user } : { name: "", age: null, email: "", gender: "", phone: "", address: "" });
    setOpenDialog(true);
  };

  const handleDialogClose = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let updatedUser;
      if (editUser) {
        updatedUser = await updateUser(editUser.id, formValues);
      } else {
        updatedUser = await addUser(formValues);
      }
      setUsers((prev) => [...prev, updatedUser]);
      handleDialogClose();
    } catch (error) {
      setError("Failed to save user:"+error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError("Failed to delete user:"+error);
    }
  };

  return (
    <div className="users">
      <Typography variant="h5" gutterBottom>
        人员管理
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="10px">
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleDialogOpen()}>
          新增
        </Button>

        <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="搜索用户"
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
        rows={users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        columns={columns}
        onEdit={handleDialogOpen}
        onDelete={handleDelete}
      />

      <Pagination
        count={users.length}
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
        title={editUser ? "编辑用户" : "新增用户"}
      />

      <AlertBox open={error !== null} onClose={() => setError(null)} message={error} severity="error" />
    </div>
  );
};

export default Users;