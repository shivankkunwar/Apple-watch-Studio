import React from "react";
import { FaApple } from "react-icons/fa";

export const Header = () => {
  return (
    <div>
      <div className="header-title m-4 font-bold flex justify-center sm:justify-start items-center">
        <FaApple className="text-lg align-top" />
        <span className=" pt-1 align-middle">WATCH</span>
      </div>
    </div>
  );
};
