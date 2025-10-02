import React from "react";
import { Outlet } from "react-router";
import NavBar from "~/components/NavBar";

const main = () => {
  return (
    <>
      <NavBar />
      <div className="py-30">
        <Outlet />
      </div>
    </>
  );
};

export default main;
