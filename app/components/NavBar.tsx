import React, { use, useState, useEffect } from "react";
import { NavLink } from "react-router";
import Theme from "./Theme";
import { TiThMenuOutline } from "react-icons/ti";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className="h-[7rem] z-100 fixed top-0 left-1/2 -translate-x-1/2 bg-bg border-2 border-transparent transition-all duration-400 shadow-lg"
      style={
        scrolled
          ? {
              top: "3rem",
              width: "90%",
              backgroundColor: "rgba(255,255,255,0.15)",
              borderRadius: "2rem",
              borderColor: "#6b21a8",
              backdropFilter: "blur(1rem)",
            }
          : {
              top: "0",
              width: "100%",
              opacity: "1",
              backdropFilter: "none",
            }
      }
    >
      <div className="max-w-[60rem] mx-auto px-5 text-text hidden md:flex items-center h-full  justify-around md:justify-between text-[clamp(1.2rem,3vw,2rem)]">
        <NavLink
          to="/"
          className="hover:text-accent transition"
          style={({ isActive }) => (isActive ? { color: "#6b21a8" } : {})}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="hover:text-accent transition"
          style={({ isActive }) => (isActive ? { color: "#6b21a8" } : {})}
        >
          About
        </NavLink>
        <NavLink
          to="/countries"
          className="hover:text-accent transition"
          style={({ isActive }) => (isActive ? { color: "#6b21a8" } : {})}
        >
          Countries
        </NavLink>
      </div>

      <div className="absolute flex left-5 top-1/2 -translate-y-1/2 text-text gap-15 bg-bg rounded-lg">
        <Theme />
      </div>

      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-text flex gap-15 bg-bg rounded-lg md:hidden">
        <TiThMenuOutline
          className="text-[clamp(4.5rem,11vw,5.5rem)] transition duration-300 hover:bg-accent/10 p-4 rounded-full cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* {Mobile View} */}

      <div
        className={`fixed top-0 left-0 w-screen h-screen z-50 bg-black/40 backdrop-blur-3xl flex items-center justify-between transition duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-10 text-[clamp(1.6rem,6vw,3rem)]">
          <NavLink
            to="/"
            className="hover:text-accent transition"
            style={({ isActive }) => (isActive ? { color: "#6b21a8" } : {})}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-accent transition"
            style={({ isActive }) => (isActive ? { color: "#6b21a8" } : {})}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/countries"
            className="hover:text-accent transition"
            style={({ isActive }) => (isActive ? { color: "#6b21a8" } : {})}
            onClick={() => setIsOpen(false)}
          >
            Countries
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
