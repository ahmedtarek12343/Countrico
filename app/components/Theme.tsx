import { useState, useEffect } from "react";

const Theme = () => {
  const [theme, setTheme] = useState("dark");
  const ToggleTheme = () => {
    setTheme((prev) => {
      prev = prev === "dark" ? "" : "dark";
      return prev;
    });

    if (theme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <button
      onClick={ToggleTheme}
      className="text-2xl font-bold text-bg bg-text px-5 py-3 cursor-pointer rounded-lg relative overflow-hidden"
    >
      <i
        className="ri-sun-line block transition-all duration-400"
        style={
          theme === "dark"
            ? { transform: "translateY(0px)" }
            : { transform: "translateY(70px)" }
        }
      ></i>
      <i
        className="ri-moon-line absolute left-[50%] translate-x-[-50%] transition-all duration-400"
        style={
          theme === "dark"
            ? { bottom: "50px" }
            : { bottom: "50%", transform: "translateY(50%)" }
        }
      ></i>
    </button>
  );
};

export default Theme;
