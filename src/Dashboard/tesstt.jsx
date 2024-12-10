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
  const [isEdited, setIsEdited] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);


  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch users, HTTP error! Status: ${response.status}`
          );
        }
        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
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

  // Handle start editing user
  const handleEdit = (user) => {
    setIsEdited(user._id);
    setEditedUser({ ...user });
  };

  // Validate edit user data
  const validateUpdateUser = () => {
    if (!editedUser.first_name || !editedUser.last_name || !editedUser.email) {
      toast.error("All fields are required!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedUser.email)) {
      toast.error("Invalid email format!");
      return false;
    }
    return true;
  };

  const handleSaveConfirmed = async () => {
    setOpenConfirmEdit(true); // Open the confirmation dialog
  };
  // Handle save edited user
  const handleSave = async () => {
    if (!validateUpdateUser()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/edit/${editedUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedUser),
        }
      );
      const data = await response.json();

      if (response.ok) {
        const updatedUser = data;

        // Update user list in state
     // Update only the edited row in state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );

      // Reset edit mode
      setIsEdited(null);
      setEditedUser({});
      toast.success("User updated successfully!");
      } else {
        throw new Error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Error updating user");
      console.error("Error updating user:", error);
    }
    setOpenConfirmDelete(false); // Close the confirmation dialog
  };

  // Handle cancel editing
  const handleCancel = () => {
    setIsEdited(null);
    setEditedUser({});
  };

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
          setUsers(users.filter((user) => user._id !== userToDelete._id));
          setFilteredUsers(
            filteredUsers.filter((user) => user._id !== userToDelete._id)
          );
          toast.success("User deleted successfully!");
        } else {
          toast.error("Failed to delete user!");
        }
      } catch (error) {
        toast.error("Error deleting user!");
        console.error("Error deleting user:", error);
      }
    }
    setOpenConfirmDelete(false);
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
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Avatar
                    src={user.image?.url}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                </TableCell>
                <TableCell>
                  {isEdited === user._id ? (
                    <TextField
                      value={editedUser.first_name}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          first_name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    user.first_name
                  )}
                </TableCell>
                <TableCell>
                  {isEdited === user._id ? (
                    <TextField
                      value={editedUser.last_name}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          last_name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    user.last_name
                  )}
                </TableCell>
                <TableCell>
                  {isEdited === user._id ? (
                    <Select
                      value={editedUser.isActive}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          isActive: e.target.value === "true",
                        })
                      }
                    >
                      <MenuItem value="true">Active</MenuItem>
                      <MenuItem value="false">Inactive</MenuItem>
                    </Select>
                  ) : user.isActive ? (
                    "Active"
                  ) : (
                    "Inactive"
                  )}
                </TableCell>
                <TableCell>{user.file_number}</TableCell>
                <TableCell>
                  {isEdited === user._id ? (
                    <TextField
                      value={editedUser.phone_number}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          phone_number: e.target.value,
                        })
                      }
                    />
                  ) : (
                    user.phone_number
                  )}
                </TableCell>
                <TableCell>
                  {isEdited === user._id ? (
                    <TextField
                      value={editedUser.email}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {isEdited === user._id ? (
                    <>
                      <Button
                        onClick={handleSaveConfirmed}
                        variant="contained"
                        color="primary"
                      >
                        Save
                      </Button>
                      <Button onClick={handleCancel} color="secondary">
                        Cancel
                      </Button>
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
        {/* Edit Confirmation Dialog */}
        <Dialog open={openConfirmEdit} onClose={() => setOpenConfirmEdit(false)}>
        <DialogTitle>Confirm Edit Submission</DialogTitle>
        <DialogContent>
          Are you sure you want to save the changes?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmEdit(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default UserTable;
