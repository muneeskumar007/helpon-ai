
import React from 'react'
import Header from '../header/Header'
import SidebarLayout from '../sidebar/Sidebar'
import { Routes, Route } from "react-router-dom";

import Course from "./Course";
import Chatbot from "../Chatbot";
import Bonafide from "./Bonafide";
import Admin from "./Admin";
// import Founder from "./components/Founder";


function Dashboard() {
  return (
    <>
    <Header />
    <SidebarLayout>
      <Routes>
        <Route path="/course" element={<Course />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/bonafide" element={<Bonafide />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="founder" element={<Founder />} /> */}
        {/* <Route path="*" element={<Course />} />  */}
      </Routes>
    </SidebarLayout>


    
    </>
  )
}

export default Dashboard

