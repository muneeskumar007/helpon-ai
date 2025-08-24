import { useState } from 'react'
import React from 'react'
import Header from './components/header/Header'
import Login from './components/pages/Login'

import './App.css'

function App() {
  

  return (
    <>
      <Header />
      <Login />
    

    
    
    </>
  )


}

export default App


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import DocumentViewer from './pages/DocumentViewer';
// import Login from './pages/Login';
// import ProtectedRoute from './components/ProtectedRoute';

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/document/:id"
//           element={
//             <ProtectedRoute>
//               <DocumentViewer />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }