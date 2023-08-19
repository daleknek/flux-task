import React from "react";
import ReactDOM from "react-dom/client";
import Board from "./client/Board";
import { LocalContextProvider } from "./client/LocalContext";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(
  <LocalContextProvider>
    <Board />
  </LocalContextProvider>
);
