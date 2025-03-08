import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Header from './components/Layout/Header.jsx'
import Footer from './components/Layout/Footer.jsx'
import Register from './components/Register/Register.jsx'
import FindParking from './pages/FindParking.jsx'
import HowItWork from './pages/HowItWork.jsx'
import ScrollTop from './components/ScrollTop.jsx'
import About from './pages/About.jsx'
import { Contact } from './pages/Contact.jsx'
import ListSpace from './pages/ListSpace.jsx'
import Profile from './components/Profile/Profile.jsx'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <ScrollTop/>
        <Header />
        <Routes>
          <Route path="/Spotly" element={<Home />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/find-parking' element={<FindParking/>}/>
          <Route path='/how-it-works' element={<HowItWork/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/host' element={<ListSpace/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App