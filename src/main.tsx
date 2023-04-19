import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { store } from "./store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

// import './index.css'

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
    sm: "320px",
    md: "615px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
}

// 3. Extend the theme
const theme = extendTheme({ breakpoints })

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
)
