import { TextField, Button } from "@mui/material";

function Task({
  taskName,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  handleConfirmTask,
  handleAddTask,
  isAddingTask,
}) {
  return (
    <div>
      {isAddingTask ? (
        <>
          <TextField
            value={taskName}
            onChange={(event) => setTaskTitle(event.target.value)}
            label="Task title"
          />
          <TextField
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
            label="Details"
          />
          <Button onClick={handleConfirmTask}>Confirm</Button>
        </>
      ) : (
        <Button onClick={handleAddTask}>Add Task</Button>
      )}
    </div>
  );
}

export default Task;
