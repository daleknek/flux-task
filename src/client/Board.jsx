import React, { useState } from "react";
import Column from "./Column";
import { Button, TextField, Box, Container } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import Footer from "./Footer";
import { reorder } from "./utils/reorder.js";

function Board() {
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([]);
  const [columnName, setColumnName] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const handleBoardNameChange = (event) => {
    setBoardName(event.target.value);
  };

  const handleAddColumn = () => {
    setIsAddingColumn(true);
  };

  const handleColumnNameChange = (event) => {
    setColumnName(event.target.value);
  };

  const handleCreateColumn = (columnName) => {
    const newColumn = { id: uuid(), name: columnName, tasks: [] };

    setColumns((prevColumns) => [...prevColumns, newColumn]);
    setIsAddingColumn(false);
  };

  const handleDeleteColumn = (columnId) => {
    setColumns((prevColumns) =>
      prevColumns.filter((column) => column.id !== columnId)
    );
  };

  const handleUpdateColumn = (columnId, updatedColumnData) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId ? { ...column, ...updatedColumnData } : column
      )
    );
  };

  const reorderColumns = (sourceIds, destinationIds) => {
    setColumns(reorder(columns, sourceIds, destinationIds));
  };

  return (
    <>
      <h2>{boardName}</h2>
      <TextField
        type="text"
        placeholder="Enter board name"
        value={boardName}
        onChange={handleBoardNameChange}
      ></TextField>

      <Header createColumn={handleCreateColumn} />
      <Container
        style={{ display: "flex", alignItems: "start", overflowX: "auto" }}
      >
        <Droppable droppableId="droppable-columns" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: "flex",
                flexWrap: "nowrap",
                minHeight: "600px",
              }}
            >
              {columns.map((column, index) => (
                <Draggable
                  key={column.id}
                  draggableId={column.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Column
                        key={column.id}
                        column={column}
                        deleteColumn={() => handleDeleteColumn(column.id)}
                        updateColumn={handleUpdateColumn}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {isAddingColumn ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              margin: "10px",
            }}
            style={{ flexShrink: 0 }}
          >
            <TextField
              value={columnName}
              onChange={handleColumnNameChange}
              label="Column name"
            />
            <Button onClick={() => handleCreateColumn(columnName)}>
              Create Column
            </Button>
          </Box>
        ) : (
          <Button
            onClick={handleAddColumn}
            style={{
              backgroundColor: "green",
              color: "white",
              margin: "10px",
              flexShrink: 0,
              alignSelf: "flex-start",
            }}
          >
            Add column
          </Button>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Board;
