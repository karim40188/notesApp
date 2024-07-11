import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <Navbar />
        <div className="container mt-2 mx-2 position-relative">
          <Outlet />
        </div>
      </div>
    </>
  );
}
