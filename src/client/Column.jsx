import React, { useState } from "react";
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import { Card as MuiCard, CardContent } from "@mui/material";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Task from "./Task";
import { reorder } from "./utils/reorder";

function Column({ column, task, setColumns, handleDeleteColumn }) {
  const [taskName, setTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const handleConfirmTask = () => {
    handleCreateTask(column.id, taskName, taskDescription);
    setTaskTitle("");
    setTaskDescription("");
    setIsAddingTask(false);
  };

  const handleCreateTask = (columnId, taskTitle, taskDescription) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  id: uuid(),
                  title: taskTitle,
                  description: taskDescription,
                },
              ],
            }
          : column
      )
    );
  };

  const handleDeleteTask = (columnId, taskId) => {
    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          };
        }
        return column;
      });
    });
  };

  const reorderTasks = (columnId, startIndex, endIndex) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: reorder(column.tasks, startIndex, endIndex),
            }
          : column
      )
    );
  };

  const moveTaskBetweenColumns = (
    sourceColumnId,
    destinationColumnId,
    sourceIndex,
    destinationIndex
  ) => {
    setColumns((prevColumns) => {
      const columnsCopy = [...prevColumns];

      const sourceColumn = columnsCopy.find(
        (column) => column.id === sourceColumnId
      );
      const destinationColumn = columnsCopy.find(
        (column) => column.id === destinationColumnId
      );

      const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);

      destinationColumn.tasks.splice(destinationIndex, 0, movedTask);

      return columnsCopy;
    });
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    if (sourceColumnId === destinationColumnId) {
      reorderTasks(sourceColumnId, source.index, destination.index);
    } else {
      moveTaskBetweenColumns(
        sourceColumnId,
        destinationColumnId,
        source.index,
        destination.index
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        width: "250px",
        boxSizing: "border-box",
        overflowY: "auto",
        flexShrink: 0,
        height: "auto",
      }}
    >
      <h3>{column.name}</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Button
          onClick={() => handleDeleteColumn(column.id)}
          style={{
            backgroundColor: red[500],
            color: "white",
            marginTop: "10px",
          }}
        >
          Delete column
        </Button>
        {isAddingTask ? (
          <MuiCard>
            <Task
              taskName={taskName}
              setTaskTitle={setTaskTitle}
              taskDescription={taskDescription}
              setTaskDescription={setTaskDescription}
              handleConfirmTask={handleConfirmTask}
              handleAddTask={handleAddTask}
              isAddingTask={isAddingTask}
            ></Task>
            <Button onClick={handleAddTask}>Add task</Button>
          </MuiCard>
        ) : (
          <Button onClick={handleDeleteTask(column.id, task.id)}>
            Delete task
          </Button>
        )}
        <Droppable droppableId={column?.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {column.tasks.map((task, index) => (
                <Draggable draggableId={task.id} index={index} key={task.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <MuiCard>
                        <CardContent>
                          <h4>{task.title}</h4>
                          <p>{task.description}</p>
                        </CardContent>
                      </MuiCard>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Column;
