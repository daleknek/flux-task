import React, { useState } from "react";
import Column from "./Column";
import { Button, Container } from "@mui/material";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import Footer from "./Footer";
import { reorder } from "./utils/reorder.js";
import { move } from "./utils/move.js";
import { useColumnsData } from "./LocalContext";
import { type } from "@testing-library/user-event/dist/type";

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
    setColumnsData(columnsData.filter((column) => column.id !== columnId));
  };

  const handleUpdateColumn = (columnId, updatedColumnData) => {
    const columns = { ...columnsData };
    columns[columnId] = updatedColumnData;

    setColumnsData(columns);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const columns = { ...columnsData };
    const columnsArray = Object.values(columns);

    // If the item is dropped outside the list, do nothing.
    if (!destination) {
      return;
    }

    // If the item is dropped onto the same place, do nothing.
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Handle column reordering
    if (
      source.droppableId === "droppable-columns" &&
      destination.droppableId === "droppable-columns"
    ) {
      const reorderedColumnsArray = reorder(
        columnsArray,
        source.index,
        destination.index
      );

      const reorderedColumns = {};
      reorderedColumnsArray.forEach((item) => {
        reorderedColumns[item.id] = item;
      });

      setColumnsData(reorderedColumns);
      return;
    }

    const startColumn =  columns[source.droppableId];
    
    const finishColumn =  columns[destination.droppableId];

    if (startColumn.id === finishColumn.id) {
      // Reordering tasks within the same column

      const reorderedTasks = reorder(
        startColumn,
        source.index,
        destination.index
      );

      const updatedColumn = {
        ...startColumn,
        tasks: reorderedTasks,
      };
      // setColumnsData([...columns, updatedColumn]);

    } else {
      // Moving tasks between columns
      const result = move(
        startColumn.tasks,
        finishColumn.tasks,
        source,
        destination
      );

      setColumnsData((prevColumns) => {
        return prevColumns.map((col) => {
          if (col.id === startColumn.id) {
            return { ...col, tasks: result.updatedSource };
          }
          if (col.id === finishColumn.id) {
            return { ...col, tasks: result.updatedDest };
          }
          return col;
        });
      });
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
        <Container>
          <Droppable
            droppableId="droppable-columns"
            direction="horizontal"
            type="column"
          >
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
                {Object.keys(columnsData).map((key, index) => {
                  const column = columnsData[key];

                  return (
                    <Draggable
                      key={`draggable-${column.id}`}
                      draggableId={String(column.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          key={`column-wrapper-${column.id}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Column
                            key={`column-${column.id}`}
                            column={column}
                            deleteColumn={() => handleDeleteColumn(column.id)}
                            updateColumn={handleUpdateColumn}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Container>
      </DragDropContext>
      <Footer />
    </>
  );
}

export default Board;
