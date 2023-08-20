import React, { useState } from "react";
import Column from "./Column";
import { Button, Container } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import Footer from "./Footer";
import { reorder } from "./utils/reorder.js";
import { move } from "./utils/move.js";
import { useColumnsData } from "./LocalContext";

function Board() {
  const [boardName, setBoardName] = useState("");
  const [isEditingBoardName, setIsEditingBoardName] = useState(true);
  const [columnsData, setColumnsData] = useColumnsData([]);
  const [columnName] = useState("");

  //Board functions

  const handleBoardNameChange = (event) => {
    setBoardName(event.target.value);
  };

  const handleKeyDownBoardName = (event) => {
    if (event.key === "Enter") {
      setIsEditingBoardName(false);
      event.preventDefault();
    }
  };

  const editBoardName = () => {
    setIsEditingBoardName(true);
  };

  //Column functions

  const handleCreateColumn = () => {
    const newColumn = { id: uuid(), name: columnName, tasks: [] };
    const columns = { ...columnsData };
    columns[newColumn.id] = newColumn;
    setColumnsData(columns);
  };

  const handleDeleteColumn = (columnId) => {
    const columns = { ...columnsData };
    delete columns[columnId];
    setColumnsData(columns);
  };

  const handleUpdateColumn = (columnId, updatedColumnData) => {
    const columns = { ...columnsData };
    columns[columnId] = updatedColumnData;

    setColumnsData(columns);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If the item is dropped outside the list, do nothing.
    if (!destination) {
      return;
    }

    // console.log("Source:", source);
    // console.log("Destination:", destination);

    // If the item is dropped onto the same place, do nothing.
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const startColumn = columnsData[source.droppableId];
    const finishColumn = columnsData[destination.droppableId];

    // console.log("Start Column Tasks Before:", startColumn.tasks);
    // console.log("Finish Column Tasks Before:", finishColumn.tasks);

    // If reordering tasks within the same column
    if (startColumn.id === finishColumn.id) {
      const reorderedTasks = reorder(
        startColumn.tasks,
        source.index,
        destination.index
      );

      const updatedColumns = {
        ...columnsData,
        [startColumn.id]: {
          ...startColumn,
          tasks: reorderedTasks,
        },
      };
      setColumnsData(updatedColumns);
    } else {
      // console.log("Moving between columns");
      // If moving tasks between columns
      const moveResult = move(
        startColumn.tasks,
        finishColumn.tasks,
        source,
        destination
      );

      // console.log("Move Result:", moveResult);

      const updatedColumns = {
        ...columnsData,
        [startColumn.id]: {
          ...startColumn,
          tasks: moveResult.updatedSource,
        },
        [finishColumn.id]: {
          ...finishColumn,
          tasks: moveResult.updatedDest,
        },
      };

      // console.log("Updated Start Column:", updatedColumns[startColumn.id]);
      // console.log("Updated Finish Column:", updatedColumns[finishColumn.id]);

      setColumnsData(updatedColumns);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Header
          boardName={boardName}
          isEditingBoardName={isEditingBoardName}
          editBoardName={editBoardName}
          handleBoardNameChange={handleBoardNameChange}
          handleKeyDownBoardName={handleKeyDownBoardName}
        />

        <Button
          onClick={(event) => handleCreateColumn(event)}
          variant="outlined"
          style={{
            marginTop: "20px",
            backgroundColor: "#f4f5f7",
            borderRadius: "5px",
            width: "250px",
            padding: "10px",
            opacity: "0.7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            margin: "10px 5px",
            boxSizing: "border-box",
            overflowY: "auto",
            flexShrink: 0,
            height: "auto",
          }}
        >
          Add column
        </Button>
        <Container
          style={{ display: "flex", flexWrap: "nowrap", minHeight: "100px" }}
        >
          {Object.keys(columnsData).map((key) => {
            const column = columnsData[key];
            return (
              <Column
                key={column.id}
                column={column}
                deleteColumn={() => handleDeleteColumn(column.id)}
                updateColumn={handleUpdateColumn}
              />
            );
          })}
        </Container>
      </DragDropContext>
      <Footer />
    </>
  );
}

export default Board;
