import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import { Container } from 'reactstrap'
import { BlackPineContext } from './context/BlackPineContext'
import Massage from './components/Massage'
import Footer from './components/Footer'
import AdminLogin from './components/AdminLogin'
import Contact from './components/Contact'

function App() {

  const { token } = useContext(BlackPineContext)

  return (
    <>

      <Header token={token} />
      
      <AdminLogin />

      <Container className='main-container' >
        <Routes>

          <Route path="/" element={< Home token={token} />} />

          <Route path="/massage" element={< Massage />} />

          <Route path="/contact" element={< Contact />} />

        </Routes>
      </Container>

      <Footer />

    </>
  )
}

export default App
