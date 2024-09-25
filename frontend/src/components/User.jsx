import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter, {
            headers: {
              Authorization : "Bearer " + localStorage.getItem("token") 
            }
          })
        .then(response => {
            setUsers(response.data.user)
        })
    },[filter])

    return  <>
    <div className="font-bold mt-6 text-lg">
        Users
    </div>
    <div className="my-2">
        <input 
            onChange={(e) => setFilter(e.target.value)} 
            type="text" 
            placeholder="Search users..." 
            className="w-full px-3 py-2 border rounded border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" 
        />
    </div>
    <div className="mt-4">
    {users.length > 0 ? (
        users.slice(0, 5).map(user => <User key={user._id} user={user} />)
    ) : (
        <p className="text-gray-500 text-center mt-4">No users found</p>
    )}
</div>
</>
}

export function User({user}) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center p-4 border-b">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center">
                <Button
                    onClick={() => {
                        navigate(`/send?id=${user._id}&name=${user.firstName}`);
                    }}
                    label={"Send Money"}
                    className="bg-blue-500 text-white font-semibold h-12 w-32 rounded hover:bg-blue-600 transition duration-200" // Fixed height and width
                />
            </div>
        </div>
    );
}