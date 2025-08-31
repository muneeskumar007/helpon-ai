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


import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaBars, FaBook, FaComments, FaUser, FaRobot } from "react-icons/fa";

export default function SidebarLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} transitionDuration={500}>
        <Menu>
          {/* Toggle */}
          <MenuItem
            icon={<FaBars />}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "" : "Toggle Sidebar"}
          </MenuItem>

          {/* Menu items */}
          <MenuItem icon={<FaBook />}> Courses </MenuItem>
          <MenuItem icon={<FaRobot />}> Chatbot </MenuItem>
          <MenuItem icon={<FaComments />}> Bonafide </MenuItem>
          <MenuItem icon={<FaUser />}> Profile </MenuItem>
        </Menu>
      </Sidebar>

      {/* Main content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}
