import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-screen flex items-center justify-center">
      <div className="rounded-lg shadow-lg bg-white w-96 p-6">
        <div className="text-center">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
        </div>
        
        <InputBox
          onChange={e => setUsername(e.target.value)}
          placeholder="abc@example.com"
          label={"Email"}
        />
        
        <InputBox
          onChange={e => setPassword(e.target.value)}
          placeholder="123456"
          label={"Password"}
        />

        <div className="pt-4">
          <Button
            onClick={async () => {
              try {
                const response = await axios.post(`${BACKEND_URL}/user/signin`, {
                  username,
                  password
                });                
                localStorage.setItem("username", username);
                localStorage.setItem("token", response.data.token);
                if (response.data.token == undefined) {
                  alert("Wrong Credentials. Try again.");
                } else {
                  navigate("/info");
                }
              } catch (error) {
                alert("An error occurred. Please try again.");
              }
            }}
            label={"Sign in"}
          />
        </div>

        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};

