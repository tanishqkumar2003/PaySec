import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {SendMoney} from "./pages/SendMoney"
import {Dashboard} from "./pages/Dashboard"
import { UserInfo } from "./components/UserInfo"
import { HomePage } from "./components/Home"
import { AboutUs } from "./components/AboutUs"
import { ContactUs } from "./components/ContactUs"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/" element={<HomePage/>} />
            <Route path="/send" element={<SendMoney/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/info" element={<UserInfo/>} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/contact" element={<ContactUs/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
