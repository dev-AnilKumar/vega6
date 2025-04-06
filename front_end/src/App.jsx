import './App.css'
import { Routes, Route } from "react-router-dom"
import Signup from './pages/SignUp'
import Login from './pages/Login'
import { useState } from 'react'
import ProtectRoute from './pages/ProtectRoute'
import Dashboard from './pages/Dashboard'
function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  return (
    <>
      <Routes>
        <Route path='/signup' element={< Signup />} />
        <Route path='/login' element={< Login setToken={setToken} />} />
        <Route path='/' element={<ProtectRoute token={token} />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
