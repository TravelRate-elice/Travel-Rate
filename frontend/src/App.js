import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recommendation from "./pages/Recommendation";
import ExchangeRatio from "./pages/ExchangeRatio";
import Login from "./pages/Login";
import "./App.css";


import { Nav } from "./components/app/Nav";
import SignUp from "./pages/SignUp";


const App = () => {
  return (
    <Router>
      <Nav/>
      <Routes>
        <Route/>
        <Route exact path='/' element={<Home/>}/>
        <Route path="/recommendation" element={<Recommendation/>}/>
        <Route path="/exchange" element={<ExchangeRatio/>}/>
        <Route path='/login/*' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  )
}

export default App