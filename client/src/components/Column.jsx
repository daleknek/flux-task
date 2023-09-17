import React, { useState } from "react";
import { Button, Typography, Input } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import TaskModal from "./TaskModal";
import TaskCard from "./TaskCard";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useColumnsData } from "./LocalContext";
import styles from "./Column.module.css";
import dayjs from "dayjs";

function Column({ column, deleteColumn }) {
  const [taskTitle, setTaskTitle] = useState("To Do");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState(dayjs());
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(column.name);
  const [editingTask, setEditingTask] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnsData, setColumnsData] = useColumnsData();
  const [editingTaskId, setEditingTaskId] = useState("");
  const [wipLimit, setWIPLimit] = useState(column.wip || "5");
  const [isEditingWIPLimit, setIsEditingWIPLimit] = useState(false);

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

  const handleWipChange = (event) => {
    setWIPLimit(event.target.value);
  };

  const handleEditWipLimit = () => {
    setIsEditingWIPLimit(true);
  };

  const handleSaveWipLimit = () => {
    setIsEditingWIPLimit(false);

    // Update the WIP limit in your columns' context data
    const updatedColumnsData = {
      ...columnsData,
      [column.id]: {
        ...columnsData[column.id],
        wip: wipLimit,
      },
    };
    setColumnsData(updatedColumnsData);
  };

  const tasks = column.tasks || [];

  //Task functions

  const handleCreateTask = (taskTitle, taskDescription) => {
    const newTask = {
      id: uuid(),
      title: taskTitle,
      description: taskDescription,
      date: dayjs().format("DD/MM/YYYY"),
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

    setIsModalOpen(false);
  };

  const handleEditClick = (task) => {
    setEditingTask(true);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setEditingTaskId(task.id);
    setIsModalOpen(true);
  };

  const handleUpdateTask = (taskId, updatedTitle, updatedDescription) => {
    // Copy the current column's tasks and modify the one we want to update
    const tasks = [...column.tasks];
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title: updatedTitle,
      description: updatedDescription,
    };

    // Update the global state with the modified tasks
    const updatedColumnsData = {
      ...columnsData,
      [column.id]: {
        ...columnsData[column.id],
        tasks: tasks,
      },
    };

    setColumnsData(updatedColumnsData);
    // Reset the editing state
    setEditingTask(false);
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

  return (
    <>
      <div className={styles.column}>
        <div className={styles.stickyContent}>
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
            <div style={{ display: "flex" }}>
              <Typography
                variant="h6"
                onClick={handleEditName}
                style={{
                  fontSize: "18px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {column.name}
              </Typography>
              <Button
                style={{ opacity: 0.5 }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
                onClick={deleteColumn}
                startIcon={<DeleteIcon />}
              />
            </div>
          )}
          {!isEditingWIPLimit ? (
            <Typography
              variant="body2"
              onClick={handleEditWipLimit}
              style={{ marginBottom: "10px" }}
            >
              Tasks: {tasks.length}/{wipLimit}
            </Typography>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <Typography variant="body2" style={{ marginRight: "5px" }}>
                WIP Limit:
              </Typography>
              <Input
                type="number"
                value={wipLimit}
                onChange={handleWipChange}
                onBlur={handleSaveWipLimit}
                onKeyDown={(event) =>
                  event.key === "Enter" && handleSaveWipLimit()
                }
                style={{ width: "50px", fontSize: "12px" }}
                autoFocus
              />
            </div>
          )}
        </div>

        <div className={styles.container}>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ minHeight: "100px" }}
              >
                {tasks.map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.draggableCard}
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
        </div>
        <div className={styles.addButton}>
          <Button
            onClick={() => setIsModalOpen(true)}
            startIcon={<AddIcon />}
            disabled={tasks.length >= wipLimit}
            style={{
              backgroundColor: tasks.length >= wipLimit ? "#ddd" : undefined,
            }}
          >
            Add Task
          </Button>
        </div>
      </div>

      <TaskModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        columnId={column.id}
        taskId={editingTaskId}
        createTask={handleCreateTask}
        updateTask={handleUpdateTask}
      />
    </>
  );
}

export default Column;
