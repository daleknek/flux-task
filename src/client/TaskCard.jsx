import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: "8px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h3
          style={{
            color: "#0079bf",
            fontSize: "20px",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          {task.title}
        </h3>
        <p
          style={{
            fontSize: "16px",
            color: "gray",
            fontFamily: "Roboto, sans-serif",
          }}
          dangerouslySetInnerHTML={{ __html: task.description }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          size="small"
          onClick={() => onEdit(task)}
          style={{ marginRight: "5px" }}
        >
          <EditIcon fontSize="small" />
        </Button>
        <Button size="small" onClick={() => onDelete(task.id)}>
          <DeleteIcon fontSize="small" />
        </Button>
      </div>
    </div>
  );
}

export default TaskCard;
