import React from "react";
import { Button, Modal, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paperStyle = {
  position: "absolute",
  width: "800px",
  height: "800px",
  overflowY: "auto",
  backgroundColor: "#fff",
  border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
  padding: "16px 32px",
  display: "flex",
};

function TaskModal({
  open,
  handleClose,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  createTask,
  taskId,
}) {
  return (
    <Modal open={open} onClose={handleClose} style={modalStyle}>
      <div style={paperStyle}>
        <div style={{ width: "70%" }}>
          <TextField
            fullWidth
            label="Task Title"
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <ReactQuill
            style={{ width: "100%", height: "500px", marginBottom: "50px" }}
            value={taskDescription}
            onChange={setTaskDescription}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => createTask(taskTitle, taskDescription)}
          >
            Create Task
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => updateTask(taskId, taskTitle, taskDescription)}
          >
            Update Task
          </Button> */}
        </div>
      </div>
    </Modal>
  );
}

export default TaskModal;
