import { NavBar, MainView, Footer } from "./components"
import { useRoutes, useLocation } from "react-router-dom"
import { HomePage, AboutPage, HowToPlayPage } from "./pages"
import { AnimatePresence } from "framer-motion"
import React, { useEffect } from "react"
import "./app.css"
import { useDispatch } from "react-redux"
import { GameSocketProvider, DisconnectedPlayerProvider } from "./components"

// Routing here?
function App() {
    const dispatch = useDispatch()
    const element = useRoutes([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/home",
            element: <HomePage />,
        },
        {
            path: "/how-to-play",
            element: <HowToPlayPage />,
        },
        {
            path: "/about",
            element: <AboutPage />,
        },
        {
            path: "/game",
            element: <MainView />,
        },
    ])

    const location = useLocation()

    if (!element) return null

    return (
        <>
            <DisconnectedPlayerProvider>
                <GameSocketProvider dispatch={dispatch}>
                    <AnimatePresence mode="wait" initial={false}>
                        {React.cloneElement(element, {
                            key: location.pathname,
                        })}
                    </AnimatePresence>
                    <Footer />
                </GameSocketProvider>
            </DisconnectedPlayerProvider>
        </>
    )
}

export default App
