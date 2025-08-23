"use client"
import React, { useState } from "react";
import {useEffect} from 'react'
import { WS_URL, BACKEND_URL } from "../app/config";
import { useRouter } from "next/navigation";


function Room({token}:{token?:string}) {


  const [socket,setSocket]=useState<WebSocket>();
  const [joinRoom, setJoinRoom]=useState("")
  const [error,setError]=useState(false)
  
  const router=useRouter()


  const handleJoinRoom=async()=>{
      const res=await fetch(`${BACKEND_URL}/joinRoom/${joinRoom}`,{
        method:"GET"
      })    

      
      if(!res.ok){
        setError(true)
        return
      }

      const data=await res.json()
      const id=data.exists.id

      const msg={
        type:"join_room",
        roomId:id
      }

      socket?.send(JSON.stringify(msg))

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
        <button onClick={handleJoinRoom}>Join room</button> <br />
        {error? "cannot find room ":null}
      </div>
    </>
  );
}

export default Room;
