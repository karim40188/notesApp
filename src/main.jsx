import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NoteContextProvider } from "./Components/Context/NoteContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>

 
    <NoteContextProvider>
      <App />
    </NoteContextProvider>
  </>
);
