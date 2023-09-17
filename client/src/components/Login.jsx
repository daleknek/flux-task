import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User data submitted:", formData);
  };

  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        height="70vh"
        justifyContent="center"
        // alignItems="center"
      >
        <Container component="main" maxWidth="xs">
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              type="password"
            />
            <Box mt={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </Box>
          </form>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Login;
