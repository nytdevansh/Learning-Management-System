import React from 'react'
import Header from '../Components/Header/Header'
import Sidebart from '../Components/Sidebar/Sidebart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Random from '../Components/Random'
import AdminDashboard from '../Layout/AdminDashboard'
import Login from '../Pages/Login'
import RegisterPage from '../Pages/RegisterPage'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/' element={<AdminDashboard/>}>
             <Route path="/dashboard" element={<Random />} />
             <Route path="/courses" element={<Random />} />
             <Route path="/students" element={<Random />} />
             <Route path="/attendance" element={<Random />} />
             <Route path="/assignments" element={<Random />} />
             <Route path="/quiz" element={<Random />} />
             <Route path="/question-bank" element={<Random />} />
             <Route path="/materials" element={<Random />} />
             <Route path="/reports" element={<Random />} />
             <Route path="/announcements" element={<Random />} />
             <Route path="/profile" element={<Random />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes