import React from "react";
import "./auth.css";

import { useNavigate } from "react-router-dom";
//omar

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
import { Component, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const theme = createTheme();
// import { useHistory } from "react-router-dom";
//omar

function Register() {

  

 
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [filenumber, setFileNumber] = useState("");
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
  
    try {
      const response = await fetch("http://localhost/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, filenumber, phonenumber, type, image }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
  
      const data = await response.json();
      console.log("Registration successful");
  
      // Do any additional actions after successful registration
      // For example, you can redirect to a different page
      // or perform any other logic specific to the super admin.
    } catch (error) {
      setError(error.message);
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
                    name="name"
                    label="Name"
                    type="name"
                    id="name"
                    autoComplete="current-name"
                    onChange={(e) => setName(e.target.value)}
                  />    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="filenumber"
                    label="File Number"
                    type="number"
                    id="filenumber"
                    autoComplete="current-filenumber"
                    onChange={(e) => setFileNumber(e.target.value)}
                  />    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phonenumber"
                    label="Phone Number"
                    type="number"
                    id="phonenumber"
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
                  <div className="register-row"> <TextField
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
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                /></div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="type"
                  label="Teacher or Student"
                  type="type"
                  id="type"
                  autoComplete="current-type"
                  onChange={(e) => setType(e.target.value)}
                />{" "}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Profile Pictrue"
                  label="Password"
                  type="file"
                  id="image"
                  autoComplete=""
                  onChange={(e) => setImage(e.target.value)}
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
