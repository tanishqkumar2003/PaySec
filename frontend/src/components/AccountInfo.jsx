import { useEffect, useState } from "react";
import axios from "axios";

export const AccountInfo = () => {
    const [info, setInfo] = useState({})

    useEffect(()=>{
         axios.get("http://localhost:3000/api/v1/user/accinfo", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(response => {
            setInfo(response.data.account);
        })       
    }, [])
        
    return <>
        <h1>Account Info</h1>
         <div>
            {info ? (
                <div>
                    <p>Balance Rs. {info.balance}</p>
                    <p>Created at : {info.createdAt}</p>
                    <p>Last transaction : {info.updatedAt}</p>
                </div>
            ) : (
                <p>No account information available.</p>
            )}
        </div>
    </>

}