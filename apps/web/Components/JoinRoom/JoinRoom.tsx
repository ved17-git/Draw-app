"use client"
import {useState} from 'react'
import { useRouter } from "next/navigation";
import { getRoomId } from "./action";
import { useActionState } from "react";


function JoinRoom() {

  const [roomName, setRoomName]=useState("")
  const [error,setError]=useState(false)
  const router=useRouter()

  const [data, action, isLoading]=useActionState(getRoomId, undefined)

  const handleJoinRoom=async()=>{    
     const id=await getRoomId(roomName)
     if(!id){
       setError(true)
       return
    }

    //here if u join the room it creates another ws connection
     console.log(id); 
     router.push(`${roomName}`)
  }
  

  return (
    <>        
      <form action={action}>
         <div className="mt-3">
            <input type="text" placeholder="Join Room" className="border-[1px]" onChange={(e)=>setRoomName(e.target.value)} />
            <button type="submit" className="bg-black text-white" onClick={handleJoinRoom}>
               {isLoading? "Joining..." : "Join Room"}
              </button>
         </div>
      </form>
      {error && "Room not found"}
    </>
  ); 
}

export default JoinRoom;
