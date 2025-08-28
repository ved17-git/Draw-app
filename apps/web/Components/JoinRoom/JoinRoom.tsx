"use client"
import { useSocket } from "../../hooks/useSocket";
import {useState} from 'react'
import { redirect, useRouter } from "next/navigation";
import { getRoomId } from "./action";
import { useActionState } from "react";


function JoinRoom({token}:{token?:string}) {

  const {socket}=useSocket(token)
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
     console.log(id); 
     
     socket?.send(JSON.stringify({
      type:"join_room",
      roomId:id
     }))
     
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
