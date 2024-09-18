import { useEffect, useState } from "react";
import axios from "axios";
import { AccountInfo } from "./AccountInfo";

export const UserInfo =  () => {
    const [info, setInfo] = useState({})

    useEffect(()=>{
         axios.get("http://localhost:3000/api/v1/user/info", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(response => {
            setInfo(response.data);
        })        
    }, [])
        console.log(info);
        
    return <>
        <h1>User Info</h1>
         <div>
            {info.user ? (
                <div>
                    <p>Username: {info.user.username}</p>
                    <p>First Name: {info.user.firstName}</p>
                    <p>Last Name: {info.user.lastName}</p>
                </div>
            ) : (
                <p>No user information available.</p>
            )}
            <AccountInfo/>
        </div>
    </>

}