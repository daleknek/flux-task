import React, { useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./TaskModal.module.css";

function TaskModal({
  open,
  handleClose,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  createTask,
  updateTask,
  taskId,
}) {
  const [startDate, setStartDate] = useState(null);

  return (
    <Modal open={open} onClose={handleClose} className={styles.modal}>
      <div className={styles.paper}>
        <div className={styles.container}>
          <div className={styles.textField}>
            <TextField
              label="Task Title"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              style={{ flexGrow: 1 }}
            />
            due date:
            <DatePicker
              showIcon
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <ReactQuill
            style={{ width: "100%", height: "500px", marginBottom: "50px" }}
            value={taskDescription}
            onChange={setTaskDescription}
          />
          {!taskId ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => createTask(taskTitle, taskDescription)}
            >
              Create Task
            </Button>
          ) : (
            <Button
              style={{ marginLeft: "10px" }}
              variant="contained"
              color="success"
              onClick={() => updateTask(taskId, taskTitle, taskDescription)}
            >
              Update Task
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default TaskModal;
