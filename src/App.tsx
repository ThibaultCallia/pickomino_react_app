import { NavBar, MainView, Footer } from './components'

import {
  
  BrowserRouter,
  Routes,
  Route,
  useRoutes,
  useLocation
} from "react-router-dom";

import { HomePage, AboutPage, HowToPlayPage } from './pages'
import { AnimatePresence } from "framer-motion";
import React from 'react';
import "./app.css";

// Routing here? 
function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/how-to-play",
      element: <HowToPlayPage />
    },
    {
      path: "/about",
      element: <AboutPage />
    },
    {
      path: "/game",
      element: <MainView />
    },
  ]);

  const location = useLocation();

  if (!element) return null;
  
  return (
    
    <>
    <NavBar/> 
      <AnimatePresence mode="wait" initial={false}>
        
        {React.cloneElement(element, { key: location.pathname })}
        <Footer/>
      </AnimatePresence>
    </>
  )
}

export default App
