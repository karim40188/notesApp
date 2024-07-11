import React, { useContext, useEffect } from "react";
import { deleteNote, getAllNotes, updateModal } from "../../Utlis/Notes";
import { noteContext } from "../Context/NoteContext";
import Loading from "../Loading/Loading";

export default function Home() {
  let { notes, setNotes } = useContext(noteContext);
  useEffect(() => {
    getAllNotes({ updater: setNotes });
  }, []);
  return (
    <>
      {notes == [] ? (
        <Loading />
      ) : notes.length === 0 ? (
        <h2 className="bg-primary text-align-center">notes not found</h2>
      ) : (
        <div className="row gap-2 p-3 ">
          {notes.map((note) => {
            return (
              <div
                key={note._id}
                className="col-md-3 border border-1 text-center p-2"
              >
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <button
                  onClick={() => {
                    deleteNote({ id: note._id, updater: setNotes });
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    updateModal({
                      id: note._id,
                      title: note.title,
                      content: note.content,
                    });
                  }}
                  className="btn btn-primary"
                >
                  update
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
