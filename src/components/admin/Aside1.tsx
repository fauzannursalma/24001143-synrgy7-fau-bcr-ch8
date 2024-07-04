import React, { useEffect } from "react";
import feather from "feather-icons";
import { useNavigate } from "react-router-dom";

interface Aside1Props {
  activePage: string;
}

const Aside1: React.FC<Aside1Props> = ({ activePage }) => {
  useEffect(() => {
    feather.replace();
  }, []);

  const navigate = useNavigate();

  return (
    <aside
      id="aside1"
      className="hidden md:flex w-16 md:flex-col items-center overflow-auto bg-[#0D28A6] pb-4 h-screen"
    >
      <div className="flex h-16 w-full items-center justify-center">
        <div className="h-8 w-8 bg-[#CFD4ED]"></div>
      </div>
      <a
        onClick={() => navigate("/dashboard")}
        className={`mt-4 flex h-16 w-full flex-col items-center justify-center rounded ${
          activePage === "dashboard" ? "bg-[#CFD4ED]" : "hover:bg-[#CFD4ED]"
        }`}
      >
        <i
          data-feather="home"
          className={`text-white ${activePage === "dashboard" ? "text-black" : ""}`}
        ></i>
        <p
          className={`text-white text-xs font-bold ${activePage === "dashboard" ? "text-black" : ""}`}
        >
          Dashboard
        </p>
      </a>
      <a
        onClick={() => navigate("/admin/cars")}
        className={`mt-4 flex h-16 w-full flex-col items-center justify-center rounded ${
          activePage === "cars" ? "bg-[#CFD4ED]" : "hover:bg-[#CFD4ED]"
        }`}
      >
        <i
          data-feather="truck"
          className={`text-white ${activePage === "cars" ? "text-black" : ""}`}
        ></i>
        <p
          className={`text-white text-xs font-bold ${activePage === "cars" ? "text-black" : ""}`}
        >
          Cars
        </p>
      </a>
    </aside>
  );
};

export default Aside1;
