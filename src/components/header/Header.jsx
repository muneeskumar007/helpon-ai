

import React from "react";
import Logo from "./Logo";
import { FaBars, FaTimes, } from "react-icons/fa";

function Header({ setMobileOpen,mobileOpen }) {
  return (
    <div className="sticky top-0 z-[50] flex items-center justify-between  pt-1 pb-1 border-b border-gray-400 bg-[#1e293b]">
      
      
      <Logo />

      
      <button className="md:hidden mr-5 text-white"
      onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}

        </button>

    </div>
  );
}

export default Header;
