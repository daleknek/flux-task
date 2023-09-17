import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
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
            Signup
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              autoFocus
            />
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
                Signup
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default SignUp;
