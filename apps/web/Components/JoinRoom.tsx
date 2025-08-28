"use client"
import { useSocket } from "../hooks/useSocket";
import {useState} from 'react'
import { useRouter } from "next/navigation";
import { getRoomId } from "./JoinRoom/action";

function JoinRoom({token}:{token?:string}) {

  const {socket}=useSocket(token)
  const [roomName, setRoomName]=useState("")
  const router=useRouter()

  const handleJoinRoom=async()=>{
     const id=await getRoomId(roomName)
     console.log(id);  
  }
  

  return (
    <>        
         <div className="mt-3">
            <input type="text" placeholder="Join Room" className="border-[1px]" onChange={(e)=>setRoomName(e.target.value)} />
            <button type="submit" className="bg-black text-white" onClick={handleJoinRoom}>Join Room</button>
         </div>
    </>
  ); 
}

export default JoinRoom;
