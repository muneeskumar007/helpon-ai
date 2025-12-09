
import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import SidebarLayout from '../sidebar/Sidebar'
import Course from "./Course";
import Chatbot from "../Chatbot";
import Chat from "./Chat";
import Admin from "./Admin";
import Profile from "./Profile";


function Dashboard() {
  return (
    <>
    
    <SidebarLayout>
      <Routes>
        <Route path="/course" element={<Course />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/admin" element={<Admin /> } />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </SidebarLayout>
      
    </>
  )
}

export default Dashboard

