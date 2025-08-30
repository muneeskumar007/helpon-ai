import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Home from './components/pages/Home';
import DocumentViewer from './components/pages/DocumentViewer';
import Login from './components/pages/Login';

import Dashboard from './components/pages/Dashboard';

export default function App() {
  



  const [user, loading] = useAuthState(auth);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/login" element={!user ?  <Navigate to="/dashboard" /> : <Login />  } /> */}
        <Route
  path="/login"
  element={user ? <Login /> : <Navigate to="/dashboard"  replace/>}
/>


        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login"  /> } />
        <Route path="/document/:id" element={<DocumentViewer /> } />
      
        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      
      </Routes>
    </>
  );
}







// import { useState } from 'react'
// import React from 'react'
// import Header from './components/header/Header'
// import Login from './components/pages/Login'

// import './App.css'

// function App() {
  

//   return (
//     <>
//       <Header />
//       <Login />
    

    
    
//     </>
//   )


// }

// export default App




// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import DocumentViewer from './pages/DocumentViewer'

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/doc/:id" element={<DocumentViewer />} />
//       </Routes>
//     </div>
//   )
// }