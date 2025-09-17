"use client"
import React from "react";
import { useSocket } from "../hooks/useSocket";
import {useEffect} from 'react'
import Canvas from "./Canvas";



function SendChats({token, messages, id}:{token?:string, messages:{message:string}[], id:number }) {

  const {socket}=useSocket(token)


  
  useEffect(()=>{
    
   if(socket){
    //always first join the room 
    socket.send(JSON.stringify({
      type:"join_room",
      roomId:id
    }))


   }

   return () => { 
    if (socket) socket.onmessage = null; 
  };
  },[socket, id])


  
  if(!socket){
    return <div>
      connecting to server
    </div>
  }
  
   

  return (
    <>
       <Canvas socket={socket} id={id} messages={messages}/>
    </>
  );
}

export default SendChats;
