import React from "react"
import ReactDOM from "react-dom/client"  
import "./index.css"
import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router";



function App (){
    return(
        <> 
        <BrowserRouter>
        <Routes>
        <Route path="/" element ={<Home></Home>}></Route>

        </Routes>
        </BrowserRouter>
        </>
    )
}
ReactDOM.createRoot(document.getElementById('root')).render(<App></App>);