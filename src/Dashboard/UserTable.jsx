import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Avatar,
  FormControl,
  InputLabel,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isEditing, setIsEditing] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        if (data && Array.isArray(data)) {
          // Filter out admin users before setting the state
          const filteredData = data.filter((user) => !user.isAdmin);
          setUsers(filteredData);
          setFilteredUsers(filteredData);
        } else if (data.data && Array.isArray(data.data)) {
          // Filter out admin users
          const filteredData = data.data.filter((user) => !user.isAdmin);
          setUsers(filteredData);
          setFilteredUsers(filteredData);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setFilteredUsers([]);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the selected filter
  useEffect(() => {
    if (filter === "all") {
      setFilteredUsers(users);
    } else if (filter === "students") {
      setFilteredUsers(users.filter((user) => !user.isTeacher));
    } else if (filter === "teachers") {
      setFilteredUsers(users.filter((user) => user.isTeacher));
    }
  }, [filter, users]);

  // Handle delete user
  const handleDelete = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${userToDelete._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // Update the state by removing the deleted user
          setUsers(users.filter((user) => user.id !== userToDelete.id));
          setFilteredUsers(
            filteredUsers.filter((user) => user.id !== userToDelete.id)
          );

          // Show the success message
          toast.success("User deleted successfully!");
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
    setOpenConfirmDelete(false); // Close the confirmation dialog
  };

  // Handle start editing user
  const handleEdit = (user) => {
    setIsEditing(user.id);
    setEditUser({ ...user });
  };

  // Handle save edited user
  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${editUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editUser),
        }
      );
      if (response.ok) {
        setUsers(
          users.map((user) =>
            user.id === editUser.id ? { ...user, ...editUser } : user
          )
        );
        setFilteredUsers(
          filteredUsers.map((user) =>
            user.id === editUser.id ? { ...user, ...editUser } : user
          )
        );
        setIsEditing(null);
        setEditUser({});
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Handle cancel editing
  const handleCancel = () => {
    setIsEditing(null);
    setEditUser({});
  };

  return (
    <div className="user-table-container">
      <h2>User Management</h2>
      <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
        <InputLabel id="filter-label">Filter Users</InputLabel>
        <Select
          labelId="filter-label"
          id="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="all">All Users</MenuItem>
          <MenuItem value="students">Students</MenuItem>
          <MenuItem value="teachers">Teachers</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Active Status</TableCell>
              <TableCell>File Number</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(filteredUsers) &&
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar
                      src={user.image?.url || ""}
                      alt={`${user.first_name} ${user.last_name}`}
                    />
                  </TableCell>
                  <TableCell>
                    {isEditing === user.id ? (
                      <TextField
                        value={editUser.first_name}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            first_name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.first_name
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === user.id ? (
                      <TextField
                        value={editUser.last_name}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            last_name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.last_name
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === user.id ? (
                      <TextField
                        value={editUser.isActive}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            isActive: e.target.value === "true" ? true : false,
                          })
                        }
                      />
                    ) : user.isActive ? (
                      "Active"
                    ) : (
                      "Inactive"
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === user.id ? (
                      <TextField
                        value={editUser.file_number}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            file_number: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.file_number
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === user.id ? (
                      <TextField
                        value={editUser.phone_number}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            phone_number: e.target.value,
                          })
                        }
                      />
                    ) : (
                      user.phone_number
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === user.id ? (
                      <TextField
                        value={editUser.email}
                        onChange={(e) =>
                          setEditUser({ ...editUser, email: e.target.value })
                        }
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === user.id ? (
                      <>
                        <IconButton onClick={handleSave}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleCancel}>Cancel</IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(user)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setUserToDelete(user);
                            setOpenConfirmDelete(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default UserTable;
