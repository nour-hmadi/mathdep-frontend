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

const AdminsTable = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isEditing, setIsEditing] = useState(null);
  const [editAdmin, setEditAdmin] = useState({});
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false);

  // Fetch admins from the backend
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user");
        if (!response.ok) throw new Error("Failed to fetch admins");
        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
          // Filter out non-admin users
          const filteredData = data.data.filter((user) => user.isAdmin);
          setAdmins(filteredData);
          setFilteredAdmins(filteredData);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching admins:", error);
        setAdmins([]);
        setFilteredAdmins([]);
      }
    };

    fetchAdmins();
  }, []);

  // Handle delete admin
  const handleDelete = async () => {
    if (adminToDelete) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${adminToDelete._id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setAdmins(admins.filter((admin) => admin._id !== adminToDelete._id));
          setFilteredAdmins(
            filteredAdmins.filter((admin) => admin._id !== adminToDelete._id)
          );
          toast.success("Admin deleted successfully!");
        } else {
          toast.error("Failed to delete admin!");
        }
      } catch (error) {
        toast.error("Error deleting admin!");
        console.error("Error deleting admin:", error);
      }
    }
    setOpenConfirmDelete(false); // Close the confirmation dialog
  };

  // Handle start editing admin
  const handleEdit = (admin) => {
    setIsEditing(admin._id);
    setEditAdmin({ ...admin });
  };

  // Validate edit admin data
  const validateUpdateAdmin = () => {
    if (!editAdmin.first_name || !editAdmin.last_name || !editAdmin.email) {
      toast.error("All fields are required!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editAdmin.email)) {
      toast.error("Invalid email format!");
      return false;
    }
    return true;
  };

  // Handle save edited admin
  const handleSaveConfirmed = async () => {
    setOpenConfirmEdit(true); // Open the confirmation dialog
  };

  const handleConfirmEdit = async () => {
    if (!validateUpdateAdmin()) return;

    const formData = new FormData();
    formData.append("first_name", editAdmin.first_name);
    formData.append("last_name", editAdmin.last_name);
    formData.append("isActive", editAdmin.isActive);
    formData.append("file_number", editAdmin.file_number);
    formData.append("phone_number", editAdmin.phone_number);
    formData.append("email", editAdmin.email);

    if (editAdmin.image) {
      formData.append("image", editAdmin.image);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/${editAdmin._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        const updatedAdmin = await response.json();
        setAdmins(
          admins.map((admin) =>
            admin._id === updatedAdmin._id ? updatedAdmin : admin
          )
        );
        setFilteredAdmins(
          filteredAdmins.map((admin) =>
            admin._id === updatedAdmin._id ? updatedAdmin : admin
          )
        );
        setIsEditing(null);
        setEditAdmin({});
        setOpenConfirmEdit(false);
        toast.success("Admin updated successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating admin:", error);
    }
  };

  // Handle cancel editing
  const handleCancel = () => {
    setIsEditing(null);
    setEditAdmin({});
  };

  return (
    <div className="admin-table-container">
      <h2>Admin Management</h2>
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
            {Array.isArray(filteredAdmins) &&
              filteredAdmins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>
                    <Avatar
                      src={admin.image?.url || ""}
                      alt={`${admin.first_name} ${admin.last_name}`}
                    />
                  </TableCell>
                  <TableCell>
                    {isEditing === admin._id ? (
                      <TextField
                        value={editAdmin.first_name}
                        onChange={(e) =>
                          setEditAdmin({
                            ...editAdmin,
                            first_name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      admin.first_name
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === admin._id ? (
                      <TextField
                        value={editAdmin.last_name}
                        onChange={(e) =>
                          setEditAdmin({
                            ...editAdmin,
                            last_name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      admin.last_name
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === admin._id ? (
                      <TextField
                        value={editAdmin.isActive}
                        onChange={(e) =>
                          setEditAdmin({
                            ...editAdmin,
                            isActive: e.target.value === "true" ? true : false,
                          })
                        }
                      />
                    ) : admin.isActive ? (
                      "Active"
                    ) : (
                      "Inactive"
                    )}
                  </TableCell>
                  <TableCell>{admin.file_number}</TableCell>
                  <TableCell>
                    {isEditing === admin._id ? (
                      <TextField
                        value={editAdmin.phone_number}
                        onChange={(e) =>
                          setEditAdmin({
                            ...editAdmin,
                            phone_number: e.target.value,
                          })
                        }
                      />
                    ) : (
                      admin.phone_number
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === admin._id ? (
                      <TextField
                        value={editAdmin.email}
                        onChange={(e) =>
                          setEditAdmin({
                            ...editAdmin,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      admin.email
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing === admin._id ? (
                      <>
                        <Button
                          onClick={handleSaveConfirmed}
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: 1 }}
                        >
                          Submit
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outlined"
                          color="secondary"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEdit(admin)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setAdminToDelete(admin);
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

      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this admin?
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

      <Dialog open={openConfirmEdit} onClose={() => setOpenConfirmEdit(false)}>
        <DialogTitle>Confirm Edit Submission</DialogTitle>
        <DialogContent>
          Are you sure you want to save the changes?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmEdit(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEdit} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default AdminsTable;
