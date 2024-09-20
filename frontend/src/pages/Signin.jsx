import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axois from "axios"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
  const navigate = useNavigate();
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>{
          setUsername(e.target.value);
        }} placeholder="abc@example.com" label={"Email"} />

        <InputBox onChange={e=>{
          setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />

        <div className="pt-4">
          <Button onClick={async ()=>{
            const response = await axois.post("https://paysec-backend.onrender.com/api/v1/user/signin", {
              username,
              password
            });
            if(!response.data.token){
              alert("Wrong Credentials  Try again")
            }
            else if(response.data.token){
            localStorage.setItem("token", response.data.token)
            navigate("/info")
            }
          }}  label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}