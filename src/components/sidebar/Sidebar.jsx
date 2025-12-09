
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  FaBook,
  FaRobot,
  FaFileAlt,
  FaUserShield,
  FaCrown,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

import Header from "../header/Header";

export default function SidebarLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden">
      
      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0  bg-gray-900 bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full z-50 
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0 mt-10" : "-translate-x-full md:translate-x-0"}
          w-64
        `}
      >
        <Sidebar backgroundColor="#1e293b" className="h-full">
         

          <Menu
            menuItemStyles={{
              button: {
                color: "white",
                ":hover": { backgroundColor: "#475569" },
                "&.ps-active": { backgroundColor: "#334155" },
              },
            }}
          >
            <MenuItem
              icon={<FaBook />}
              component={<Link to="/dashboard/course" />}
              active={location.pathname.includes("course")}
              onClick={() => setMobileOpen(false)}
            >
              Course
            </MenuItem>

            <MenuItem
              icon={<FaRobot />}
              component={<Link to="/dashboard/chatbot" />}
              active={location.pathname.includes("chatbot")}
              onClick={() => setMobileOpen(false)}
            >
              Chatbot
            </MenuItem>

            <MenuItem
              icon={<FaFileAlt />}
              component={<Link to="/dashboard/chat" />}
              active={location.pathname.includes("chat")}
              onClick={() => setMobileOpen(false)}
            >
              Chat
            </MenuItem>

            <MenuItem
              icon={<FaUserShield />}
              component={<Link to="/dashboard/admin" />}
              active={location.pathname.includes("admin")}
              onClick={() => setMobileOpen(false)}
            >
              Admin
            </MenuItem>

            {/* <MenuItem
              icon={<FaCrown />}
              component={<Link to="/dashboard/founder" />}
              active={location.pathname.includes("founder")}
              onClick={() => setMobileOpen(false)}
            >
              Founder
            </MenuItem> */}

            {/* Profile with popup */}
            <MenuItem
              icon={<FaUserCircle />}
              component={<Link to="/dashboard/profile" />}
              // active={profileOpen}
              active={location.pathname.includes("profile")}
              // onClick={() => setProfileOpen(!profileOpen)}
              onClick={() => setMobileOpen(false)}
            >
              Profile
            </MenuItem>
           
          </Menu>
        </Sidebar>
      </div>

      
      <main className="flex-1 overflow-y-auto md:ml-64">

        
        {/* <Header setMobileOpen={setMobileOpen} /> */}
        <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />


        {/* Page content */}
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
