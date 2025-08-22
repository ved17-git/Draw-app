"use client"
import React, { useState } from "react";
import {useEffect} from 'react'
import { WS_URL } from "../app/config";
import { useRouter } from "next/navigation";


function Room({token}:{token?:string}) {


  const [socket,setSocket]=useState<WebSocket>();
  const [joinRoom, setJoinRoom]=useState("")
  
  const router=useRouter()

  const handleJoinRoom=()=>{
      router.push(`/${joinRoom}`)
  }


  useEffect(()=>{

   
    const ws=new WebSocket(`${WS_URL}/join?token=${token}`)

    ws.onopen=()=>{
        setSocket(ws)
        console.log("connected");
    }

    ws.onclose=()=>{
      console.log("disconnected");
      
      return
    }
    
  },[])


  return (
    <>        
      <div>Room </div>

      <div>
        <input type="text" placeholder="join room" value={joinRoom} onChange={(e)=>{setJoinRoom(e.target.value)}} />
        <button onClick={handleJoinRoom}>Join room</button>
      </div>
    </>
  );
}

export default Room;
