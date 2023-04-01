import Navbar from './components/Navbar'
import MainView from './components/MainView'
import Footer from './components/Footer'
import { useState, useReducer } from 'react'
import './App.css'

function App() {
  const [gameState, setGameState] = useState({});
  

  return (
    <>
    <Navbar/>
    <MainView/>
    <Footer/>
    </>
    
    
  )
}

export default App
