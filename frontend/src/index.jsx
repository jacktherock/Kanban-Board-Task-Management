import React from 'react'
import { createRoot } from "react-dom/client";
import App from './App.jsx'
import './index.css'
import { TasksProvider } from './context/TasksContext.jsx'


const root = createRoot(document.getElementById("root"));

root.render(
  <TasksProvider>
    <App />
  </TasksProvider>
);