// for react pro sidebar

// import React from 'react'
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

// function OpenSidebar() {
//   return (
//     <>
//     {/* <div className=" bg-gray-900 overflow-y-hidden fixed z-0 top-13 left-0 w-screen min-h-screen flex justify-center items-center flex-col gap-10 duration-300 ease-in">
//            </div>
//     <div>Sidebar</div> */}

//     <Sidebar>
//   <Menu>
//     <SubMenu label="Charts">
//       <MenuItem> Pie charts </MenuItem>
//       <MenuItem> Line charts </MenuItem>
//     </SubMenu>
//     <MenuItem> Documentation </MenuItem>
//     <MenuItem> Calendar </MenuItem>
//   </Menu>
// </Sidebar>;
//     </>
//   )
// }

// export default OpenSidebar



// import React, { useState } from "react";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { FaBars, FaBook, FaComments, FaUser } from "react-icons/fa";

// // import React, { useState,useEffect } from "react";
// // import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// // import { FaBars } from "react-icons/fa";
// // import "react-pro-sidebar/dist/css/styles.css";
// import "./Sidebar.css";


// // Import your components
// import Course from "../pages/Course";
// import Chatbot from "../Chatbot";
// import Bonafide from "../pages/Bonafide";
// import Admin from "../pages/Admin";
// // import Profile from "./Profile";

// export default function SidebarLayout() {

// // resbonsive sidebar
// const [activeView, setActiveView] = useState("courses");
//   const [isOpen, setIsOpen] = useState(true); // sidebar open/close
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect screen size
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       setIsOpen(window.innerWidth > 768); // auto open on desktop
//     };
//     handleResize(); // run on mount
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const renderView = () => {
//     switch (activeView) {
//       case "courses":
//         return <Course />;
//       case "chatbot":
//         return <Chatbot />;
//       case "bonafide":
//         return <Bonafide />;
//       case "admin":
//         return <Admin />;
//       case "profile":
//         return <Profile />;
//       default:
//         return <Course />;
//     }
//   };

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Toggle button (mobile only) */}
//       {isMobile && (
//         <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? "<" : ">"}
//         </button>
//       )}

//       {/* Sidebar */}
//       <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
//         <Sidebar>
//           <Menu>
//             <MenuItem
//               className={activeView === "courses" ? "active" : ""}
//               onClick={() => setActiveView("courses")}
//             >
//               📚 Courses
//             </MenuItem>
//             <MenuItem
//               className={activeView === "chatbot" ? "active" : ""}
//               onClick={() => setActiveView("chatbot")}
//             >
//               🤖 Chatbot
//             </MenuItem>
//             <MenuItem
//               className={activeView === "bonafide" ? "active" : ""}
//               onClick={() => setActiveView("bonafide")}
//             >
//               📄 Bonafide
//             </MenuItem>
//             <MenuItem
//               className={activeView === "admin" ? "active" : ""}
//               onClick={() => setActiveView("admin")}
//             >
//               🛠️ Admin
//             </MenuItem>
//             <MenuItem
//               className={activeView === "profile" ? "active" : ""}
//               onClick={() => setActiveView("profile")}
//             >
//               👤 Profile
//             </MenuItem>
//           </Menu>
//         </Sidebar>
//       </div>

//       {/* Main content */}
//       <main style={{ flex: 1, padding: "20px" }}>{renderView()}</main>
//     </div>

  // const [activeView, setActiveView] = useState("courses");
   
  // const renderView = () => {
  //   switch (activeView) {
  //     case "courses":
  //       return <Course />;
  //     case "chatbot":
  //       return <Chatbot />;
  //     case "bonafide":
  //       return <Bonafide />;
  //     case "admin":
  //       return <Admin />;
  //     case "profile":
  //       return <Profile />;
  //     default:
  //       return <Course />;
  //   }
  // };

  // return (
  //   <div style={{ display: "flex", height: "100vh" }}>
  //     {/* Sidebar */}
  //     <Sidebar
  //       breakPoint="md"
  //       backgroundColor="#1e1e2f"
  //       transitionDuration={300}
  //       rootStyles={{
  //         color: "#fff",
  //       }}
  //       menuItemStyles={{
  //         button: ({ active }) => {
  //           return {
  //             color: active ? "#00d4ff" : "#fff",
  //             backgroundColor: active ? "#252542" : "transparent",
  //             "&:hover": {
  //               color: "#00d4ff",
  //               backgroundColor: "#33334d",
  //             },
  //           };
  //         },
  //       }}
  //     >
  //       <Menu>
  //         <MenuItem
  //           active={activeView === "courses"}
  //           icon={<FaBook />}
  //           onClick={() => setActiveView("courses")}
  //         >
  //           Courses
  //         </MenuItem>
  //         <MenuItem
  //           active={activeView === "chatbot"}
  //           icon={<FaRobot />}
  //           onClick={() => setActiveView("chatbot")}
  //         >
  //           Chatbot
  //         </MenuItem>
  //         <MenuItem
  //           active={activeView === "bonafide"}
  //           icon={<FaFileAlt />}
  //           onClick={() => setActiveView("bonafide")}
  //         >
  //           Bonafide
  //         </MenuItem>
  //         <MenuItem
  //           active={activeView === "admin"}
  //           icon={<FaTools />}
  //           onClick={() => setActiveView("admin")}
  //         >
  //           Admin
  //         </MenuItem>
  //         <MenuItem
  //           active={activeView === "profile"}
  //           icon={<FaUser />}
  //           onClick={() => setActiveView("profile")}
  //         >
  //           Profile
  //         </MenuItem>
  //       </Menu>
  //     </Sidebar>

  //     {/* Toggle button for mobile */}
  //     {broken && (
  //       <button
  //         onClick={() => toggleSidebar(!toggled)}
  //         style={{
  //           position: "fixed",
  //           top: 20,
  //           left: 20,
  //           background: "#1e1e2f",
  //           border: "none",
  //           color: "#fff",
  //           padding: "8px 12px",
  //           borderRadius: "4px",
  //           cursor: "pointer",
  //           zIndex: 2000,
  //         }}
  //       >
  //         <FaBars />
  //       </button>
  //     )}

  //     {/* Main Content */}
  //     {/* <main style={{ flex: 1, padding: "20px" }}>{renderView()}</main>
  //    */}
  //    <main style={{ flex: 1, padding: "20px" }}>
  //       <h1>Dashboard</h1>
  //       <p>Welcome to your app 🚀</p>
  //     </main>
  //   </div>
//   );
// }


// import React, { useState } from "react";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { FaBars, FaBook, FaComments, FaUser, FaRobot } from "react-icons/fa";

// export default function SidebarLayout() {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Sidebar */}
//       <Sidebar collapsed={collapsed} transitionDuration={500}>
//         <Menu>
//           {/* Toggle */}
//           <MenuItem
//             icon={<FaBars />}
//             onClick={() => setCollapsed(!collapsed)}
//           >
//             {collapsed ? "" : "Toggle Sidebar"}
//           </MenuItem>

//           {/* Menu items */}
//           <MenuItem icon={<FaBook />}> Courses </MenuItem>
//           <MenuItem icon={<FaRobot />}> Chatbot </MenuItem>
//           <MenuItem icon={<FaComments />}> Bonafide </MenuItem>
//           <MenuItem icon={<FaUser />}> Profile </MenuItem>
//         </Menu>
//       </Sidebar>

//       {/* Main content */}
//       <main style={{ flex: 1, padding: "20px" }}>
//         <h1>Dashboard</h1>
//       </main>
//     </div>
//   );
// }











// import React, { useState } from "react";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import {
//   FaBook,
//   FaRobot,
//   FaFileAlt,
//   FaUserShield,
//   FaCrown,
//   FaUserCircle,
//   FaBars,
//   FaSignOutAlt,
// } from "react-icons/fa";

// // Dummy components for content
// const Course = () => <div className="p-6">📘 Course Component</div>;
// const Chatbot = () => <div className="p-6">🤖 Chatbot Component</div>;
// const Bonafide = () => <div className="p-6">📄 Bonafide Component</div>;
// const Admin = () => <div className="p-6">🛡️ Admin Component</div>;
// const Founder = () => <div className="p-6">👑 Founder Component</div>;

// export default function SidebarLayout() {
//   const [active, setActive] = useState("course");
//   const [profileOpen, setProfileOpen] = useState(false);

//   const renderContent = () => {
//     switch (active) {
//       case "course":
//         return <Course />;
//       case "chatbot":
//         return <Chatbot />;
//       case "bonafide":
//         return <Bonafide />;
//       case "admin":
//         return <Admin />;
//       case "founder":
//         return <Founder />;
//       default:
//         return <Course />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar
//         breakPoint="md"
//         backgroundColor="#1e293b"
//         className="text-white shadow-xl"
//       >
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           <h1 className="text-lg font-bold">My App</h1>
//           <button className="md:hidden">
//             <FaBars />
//           </button>
//         </div>

//         <Menu
//           menuItemStyles={{
//             button: ({ active }) => {
//               return {
//                 backgroundColor: active ? "#334155" : "",
//                 color: "white",
//                 ":hover": { backgroundColor: "#475569" },
//               };
//             },
//           }}
//         >
//           <MenuItem icon={<FaBook />} onClick={() => setActive("course")}>
//             Course
//           </MenuItem>
//           <MenuItem icon={<FaRobot />} onClick={() => setActive("chatbot")}>
//             Chatbot
//           </MenuItem>
//           <MenuItem icon={<FaFileAlt />} onClick={() => setActive("bonafide")}>
//             Bonafide
//           </MenuItem>
//           <MenuItem icon={<FaUserShield />} onClick={() => setActive("admin")}>
//             Admin
//           </MenuItem>
//           <MenuItem icon={<FaCrown />} onClick={() => setActive("founder")}>
//             Founder
//           </MenuItem>

//           <MenuItem
//             icon={<FaUserCircle />}
//             onClick={() => setProfileOpen(!profileOpen)}
//           >
//             Profile
//           </MenuItem>

//           {/* Profile popup */}
//           {profileOpen && (
//             <div className="ml-10 mt-2 bg-gray-800 p-2 rounded-lg shadow-lg text-sm">
//               <button
//                 className="flex items-center gap-2 text-red-400 hover:text-red-300"
//                 onClick={() => alert("Logged out")}
//               >
//                 <FaSignOutAlt /> Logout
//               </button>
//             </div>
//           )}
//         </Menu>
//       </Sidebar>

//       {/* Main content */}
//       <main className="flex-1 overflow-y-auto">{renderContent()}</main>
//     </div>
//   );
// }











//  import React, { useState } from "react";
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FaBook,
//   FaRobot,
//   FaFileAlt,
//   FaUserShield,
//   FaCrown,
//   FaUserCircle,
//   FaBars,
//   FaTimes,
//   FaSignOutAlt,
// } from "react-icons/fa";

// export default function SidebarLayout({ children }) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const location = useLocation();

//   return (
//     <div className="flex h-screen bg-gray-100 relative overflow-hidden">
//       {/* Sidebar overlay for mobile */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* Sidebar (floating overlay style) */}
//       <Sidebar
//         backgroundColor="#1e293b"
//         className={`text-white shadow-xl fixed top-0 left-0 h-full z-50 transition-transform duration-300
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           <h1 className="text-lg font-bold">My App</h1>
//           {/* Close button (mobile only) */}
//           <button className="md:hidden" onClick={() => setMobileOpen(false)}>
//             <FaTimes />
//           </button>
//         </div>

//         <Menu
//           menuItemStyles={{
//             button: {
//               color: "white",
//               ":hover": { backgroundColor: "#475569" },
//               "&.ps-active": { backgroundColor: "#334155" }, // dark highlight
//             },
//           }}
//         >
//           <MenuItem
//             icon={<FaBook />}
//             component={<Link to="/dashboard/course" />}
//             active={location.pathname.includes("course")}
//             onClick={() => setMobileOpen(false)}
//           >
//             Course
//           </MenuItem>

//           <MenuItem
//             icon={<FaRobot />}
//             component={<Link to="/dashboard/chatbot" />}
//             active={location.pathname.includes("chatbot")}
//             onClick={() => setMobileOpen(false)}
//           >
//             Chatbot
//           </MenuItem>

//           <MenuItem
//             icon={<FaFileAlt />}
//             component={<Link to="/dashboard/bonafide" />}
//             active={location.pathname.includes("bonafide")}
//             onClick={() => setMobileOpen(false)}
//           >
//             Bonafide
//           </MenuItem>

//           <MenuItem
//             icon={<FaUserShield />}
//             component={<Link to="/dashboard/admin" />}
//             active={location.pathname.includes("admin")}
//             onClick={() => setMobileOpen(false)}
//           >
//             Admin
//           </MenuItem>

//           <MenuItem
//             icon={<FaCrown />}
//             component={<Link to="/dashboard/founder" />}
//             active={location.pathname.includes("founder")}
//             onClick={() => setMobileOpen(false)}
//           >
//             Founder
//           </MenuItem>

//           {/* Profile with popup */}
//           <MenuItem
//             icon={<FaUserCircle />}
//             active={profileOpen}
//             onClick={() => setProfileOpen(!profileOpen)}
//           >
//             Profile
//           </MenuItem>
//           {profileOpen && (
//             <div className="ml-10 mt-2 bg-gray-800 p-2 rounded-lg shadow-lg text-sm">
//               <button
//                 className="flex items-center gap-2 text-red-400 hover:text-red-300"
//                 onClick={() => alert("Logged out")}
//               >
//                 <FaSignOutAlt /> Logout
//               </button>
//             </div>
//           )}
//         </Menu>
//       </Sidebar>

//       {/* Main content */}
//       <main className="flex-1 overflow-y-auto">
//         {/* Top bar with hamburger (mobile only) */}
//         <div className="p-4 bg-white shadow md:hidden">
//           <button onClick={() => setMobileOpen(true)}>
//             <FaBars size={20} />
//           </button>
//         </div>
//         <div className="p-4">{children}</div>
//       </main>
//     </div>
//   );
// }






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

export default function SidebarLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100 relative overflow-hidden">
      {/* Overlay for mobile when sidebar is open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full z-50 
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-64
        `}
      >
        <Sidebar backgroundColor="#1e293b" className="h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-700 text-white">
            <h1 className="text-lg font-bold">My App</h1>
            {/* Close button for mobile */}
            <button className="md:hidden" onClick={() => setMobileOpen(false)}>
              <FaTimes />
            </button>
          </div>

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
              component={<Link to="/dashboard/bonafide" />}
              active={location.pathname.includes("bonafide")}
              onClick={() => setMobileOpen(false)}
            >
              Bonafide
            </MenuItem>

            <MenuItem
              icon={<FaUserShield />}
              component={<Link to="/dashboard/admin" />}
              active={location.pathname.includes("admin")}
              onClick={() => setMobileOpen(false)}
            >
              Admin
            </MenuItem>

            <MenuItem
              icon={<FaCrown />}
              component={<Link to="/dashboard/founder" />}
              active={location.pathname.includes("founder")}
              onClick={() => setMobileOpen(false)}
            >
              Founder
            </MenuItem>

            {/* Profile with popup */}
            <MenuItem
              icon={<FaUserCircle />}
              active={profileOpen}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              Profile
            </MenuItem>
            {profileOpen && (
              <div className="ml-10 mt-2 bg-gray-800 p-2 rounded-lg shadow-lg text-sm">
                <button
                  className="flex items-center gap-2 text-red-400 hover:text-red-300"
                  onClick={() => alert("Logged out")}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </Menu>
        </Sidebar>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto md:ml-64">
        {/* Mobile top bar with hamburger */}
        <div className="p-4 bg-white shadow md:hidden">
          <button onClick={() => setMobileOpen(true)}>
            <FaBars size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
