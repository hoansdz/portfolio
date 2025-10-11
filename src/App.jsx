import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import './App.css'
import Navigator from './view/navigator'
import Home from './view/home'
import About from './view/about'
import Projects from './view/projects'
import Contact from './view/contact'
import BottomNavigator from './view/bottom_navigator'

function App() {
  return (
    <BrowserRouter>
      <div className='main-body'>
        <Navigator />
        <div className="App">
          {/* <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/projects' element={<Projects />} />
          </Routes> */}
          <Home />
        </div>
        <BottomNavigator />
      </div>
    </BrowserRouter>
  );
}


export default App
