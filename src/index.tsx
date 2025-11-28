import * as React from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./components/App";

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
