import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Board from "./components/Board";
import Column from "./components/Column";
import TaskModal from "./components/TaskModal";

function App() {
  function RequireAuth({ children, redirectTo }) {
    const isAuthenticated = localStorage.getItem("userToken") ? true : false;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  return (
    <Routes>
      {/* Redirect to /login when I've solved Login/SignUp logic */}
      <Route path="/" element={<Board />} />
      <Route
        path="/board"
        element={
          <RequireAuth redirectTo="/login">
            <Board />
          </RequireAuth>
        }
      />
      <Route
        path="/column/:id"
        element={
          <RequireAuth redirectTo="/login">
            <Column />
          </RequireAuth>
        }
      />
      <Route
        path="/task/:id"
        element={
          <RequireAuth redirectTo="/login">
            <TaskModal />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
