import React, { useState } from "react";
import { Button, Typography, Input } from "@mui/material";
import { Container } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useColumnsData } from "./LocalContext";

function Column({ column, deleteColumn }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(column.name);
  const [editingTask, setEditingTask] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [columnsData, setColumnsData] = useColumnsData();

  // useEffect(() => {
  //   console.log("Component re-rendered!", columnsData);
  // }, [columnsData]);

  //Column functions

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
    const updatedColumnsData = {
      ...columnsData,
      [column.id]: {
        ...columnsData[column.id],
        name: editedName,
      },
    };
    setColumnsData(updatedColumnsData);
  };

  const tasks = column.tasks || [];

  //Task functions

  const handleCreateTask = (taskTitle, taskDescription) => {
    if (editingTask) {
      handleUpdateTask(taskId);
    } else {
      const newTask = {
        id: uuid(),
        title: taskTitle,
        description: taskDescription,
        columnId: column.id,
      };

      // updates the respective column in columnsData global state to reflect the new task
      const updatedColumnsData = {
        ...columnsData,
        [column.id]: {
          ...columnsData[column.id],
          tasks: [...tasks, newTask],
        },
      };
      setColumnsData(updatedColumnsData);
    }

    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    // updates the global columnsData
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const updatedColumnsData = {
      ...columnsData,
      [column.id]: {
        ...columnsData[column.id],
        tasks: updatedTasks,
      },
    };
    setColumnsData(updatedColumnsData);
  };

  const handleUpdateTask = (taskId) => {
    // Find the index of the task we want to update
    const taskIndex = column.tasks.findIndex((task) => task.id === taskId);

    // If the task was not found, exit early
    if (taskIndex === -1) return;

    // Copy the current column's tasks and modify the one we want to update
    const updatedTasks = [...column.tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      title: taskTitle,
      description: taskDescription,
    };

    // Update the global state with the modified tasks
    const updatedColumnsData = {
      ...columnsData,
      [column.id]: {
        ...columnsData[column.id],
        tasks: updatedTasks,
      },
    };

    setColumnsData(updatedColumnsData);

    // Reset the editing state
    setEditingTask(false);
  };

  const handleEditClick = (task) => {
    setIsModalOpen(true);
    setEditingTask(true);
    setTaskId(task.id);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
  };

  return (
    <div
      style={{
        backgroundColor: "#white",
        borderRadius: "5px",
        padding: "10px",
        margin: "10px 5px",
        width: "250px",
        boxSizing: "border-box",
        overflowY: "auto",
        flexShrink: 0,
        height: "auto",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.2)",
      }}
    >
      {isEditingName || !column.name ? (
        <Input
          placeholder="Enter column name"
          value={editedName}
          onChange={handleNameChange}
          onBlur={handleNameSave}
          onKeyDown={(event) => event.key === "Enter" && handleNameSave()}
          autoFocus
          style={{ fontSize: "18px", fontWeight: "bold" }}
        />
      ) : (
        <Typography
          variant="h6"
          onClick={handleEditName}
          style={{ fontSize: "18px", cursor: "pointer", fontWeight: "bold" }}
        >
          {column.name}
        </Typography>
      )}
      <Button
        style={{ opacity: 0.5 }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
        onClick={deleteColumn}
        startIcon={<DeleteIcon />}
      />
      <TaskModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        createTask={handleCreateTask}
        columnId={column.id}
      />
      <Button onClick={() => setIsModalOpen(true)} startIcon={<AddIcon />}>
        Add Task
      </Button>

      <Container>
        <Droppable droppableId={column.id} type="task">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ minHeight: "100px", backgroundColor: "#f7f7f7" }}
            >
              {tasks.map((task, index) => (
                <Draggable draggableId={task.id} index={index} key={task.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        backgroundColor: "#ffffff",
                        borderRadius: "5px",
                        padding: "8px",
                        marginBottom: "10px",
                        boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.backgroundColor = "#e6e6e6";
                        event.currentTarget.style.boxShadow =
                          "0px 2px 6px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.backgroundColor = "#ffffff";
                        event.currentTarget.style.boxShadow =
                          "0px 1px 3px rgba(0,0,0,0.1)";
                      }}
                    >
                      <TaskCard
                        task={task}
                        columnId={column.id}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditClick}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Container>
    </div>
  );
}

export default Column;
