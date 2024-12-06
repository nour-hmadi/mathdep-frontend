import React from "react";
import "./auth.css";

import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();
// import { useHistory } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [file_number, setFileNumber] = useState("");
  const [error, setError] = useState(null);
  const [isTeacher, setIsTeacher] = useState(true); // default to Student
  const [image, setImage] = useState("");
  const [fileNumberError, setFileNumberError] = useState(null);
  const [isFileNumberValid, setIsFileNumberValid] = useState(true); // To track if file number is valid

  const checkFileNumberExistence = async (file_number) => {
    if (!file_number) return;
    setFileNumberError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/check-file-number`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file_number }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          setIsFileNumberValid(false);
          setFileNumberError("File number already exists");
        } else {
          setIsFileNumberValid(true);
          setFileNumberError(null);
        }
      } else {
        throw new Error("Error checking file number");
      }
    } catch (error) {
      console.error("Error:", error);
      setIsFileNumberValid(false);
      setFileNumberError("Failed to check file number");
    }
  };
  ///handle submit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      file_number,
      phone_number,
      isTeacher,
    });
    setError(null);

    //////////
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !file_number ||
      !phone_number ||
      !confirmPassword
    ) {
      toast.error("All fields are required!", { autoClose: 3000 });
      return;
    }

    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!", { autoClose: 3000 });
      return;
    }

    // Validate password length
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long!", {
        autoClose: 3000,
      });
      return;
    }

    // Validate that password and confirmPassword match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { autoClose: 3000 });
      return;
    }
    //////////

    ///

    // Create a new FormData object
    const formData = new FormData();

    // Append form data to FormData object
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file_number", file_number);
    formData.append("phone_number", phone_number);
    formData.append("isTeacher", isTeacher);

    // Append the image file to the FormData object
    if (image) {
      formData.append("image", image); // 'image' is the field name in the backend
    }
    ////////
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({
        //   name,
        //   email,
        //   password,
        //   filenumber,
        //   phonenumber,
        //   type,
        //   image,
        // }),
        body: formData, //send the FormData object as the request body
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      console.log("Registration successful");
      toast.success("Registration done successfully", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/");
      }, 2000);
      // Do any additional actions after successful registration
      // For example, you can redirect to a different page
      // or perform any other logic specific to the super admin.
    } catch (error) {
      setError(error.message);
      toast.error("An error occurred. Please try again later.", {
        autoClose: 2000,
      });
      console.error(error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <img />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register User
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <div className="register-row">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="first_name"
                    label="First Name"
                    type="first_name"
                    id="first_name"
                    autoComplete="current-name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />{" "}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="last_name"
                    label="Last Name"
                    type="last_name"
                    id="last_name"
                    autoComplete="current-name"
                    onChange={(e) => setLastName(e.target.value)}
                  />{" "}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="file_number"
                    label="File Number"
                    type="number"
                    id="file_number"
                    autoComplete="current-filenumber"
                    onChange={(e) => {
                      setFileNumber(e.target.value);
                      checkFileNumberExistence(e.target.value); // Check if file number exists
                    }}
                    error={!isFileNumberValid} // Show error if file number is invalid
                    //helperText={fileNumberError} // Display error message
                  />
                  {/* Error message if file number already exists */}
                  {fileNumberError && (
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ fontWeight: "bold", marginTop: 1 }}
                    >
                      {fileNumberError} {/* Display the error message */}
                    </Typography>
                  )}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phone_number"
                    label="Phone Number"
                    type="number"
                    id="phone_number"
                    autoComplete="current-phonenumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="register-row">
                  {" "}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="off"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {/* <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="type"
                  label="Teacher or Student"
                  type="type"
                  id="type"
                  autoComplete="current-type"
                  onChange={(e) => setIsTeacher(e.target.value)}
                />{" "} */}
                <Select
                  labelId="isTeacher"
                  id="isTeacher"
                  value={isTeacher}
                  onChange={(e) => setIsTeacher(e.target.value)}
                  label="Teacher or Student"
                >
                  <MenuItem value={true}>Teacher</MenuItem>
                  <MenuItem value={false}>Student</MenuItem>
                </Select>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Profile Pictrue"
                  label="Profile Picture"
                  type="file"
                  id="image"
                  autoComplete="off"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register User
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default Register;
