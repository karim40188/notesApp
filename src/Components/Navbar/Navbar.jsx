import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.module.css";
import { showAddModel } from "../../Utlis/Notes";
import { noteContext } from "../Context/NoteContext";

export default function Navbar() {
  let { notes, setNotes } = useContext(noteContext);

  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <>
      {localStorage.getItem("userToken") ? (
        <nav className="vh-100">
          <ul className=" mb-5">
            <button
              onClick={() => {
                showAddModel({ updater: setNotes });
              
              }}
              className="addBtn"
            >
              Add Note
            </button>
            <li>
              <Link to="/home">NOTE APP</Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  logOut();
                }}
                to="/login"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}
