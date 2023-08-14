import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Board from "./client/Board";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <Board />
  </StrictMode>
);
