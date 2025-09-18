"use client"
import React from "react";
import { useSocket } from "../hooks/useSocket";
import {useEffect} from 'react'
import Canvas from "./Canvas";

interface shapesTypes{
  type:string,
  x:number,
  y:number,
  width:number
  height:number
}


function SendChats({token, shapes, id}:{token?:string, shapes:shapesTypes[], id:number }) {

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
       <Canvas socket={socket} id={id} shapes={shapes}/>
    </>
  );
}

export default SendChats;
