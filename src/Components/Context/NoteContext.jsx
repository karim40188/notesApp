import { createContext, useState } from "react";

export let noteContext = createContext();

export function NoteContextProvider({ children }) {
  let [notes, setNotes] = useState([]);
  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {children}
    </noteContext.Provider>
  );
}
