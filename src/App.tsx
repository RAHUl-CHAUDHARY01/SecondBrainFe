// import React from 'react'

import { Toaster } from "react-hot-toast"
import Dashboard from "./pages/dashboard"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

import { BrowserRouter,Routes,Route } from "react-router-dom"
function App() {
  return (
    <BrowserRouter>

      <Toaster/>
    <Routes>
      <Route path="/" element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
