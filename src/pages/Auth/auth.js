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

function Auth() {
  const [zih, setZih] = useState(false);

  function activateZih() {
    setZih(true);
  }

  function deactivateZih() {
    setZih(false);
  }
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, address, phonenumber }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("Id", data.user);
      sessionStorage.setItem("isAdmin", data.isAdmin);
      if (data.isAdmin === true) {
        navigate("/");
      }
      console.log("Registration successful");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  //   login
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    if (!email || !password) {
      toast.error("Please enter your email and password", { autoClose: 2000 });
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
        toast.error("Invalid email or password", { autoClose: 2000 });
      }
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("id", data._id);
      sessionStorage.setItem("isAdmin", data.isAdmin);
      sessionStorage.setItem("name", data.name);
      toast.success("Logged in", { autoClose: 2000 });
      // if (data.role === "User") {
      window.location.href = "/";
      // }
      console.log("Login successful");
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
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
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
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleLogin}
                sx={{ mt: 1 }}
              >
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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
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

export default Auth;
