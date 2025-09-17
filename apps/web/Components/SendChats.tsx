"use client"
import React from "react";
import { useSocket } from "../hooks/useSocket";
import {useEffect, useState, useRef} from 'react'
import { initializeDrawing } from "../draw/draw";
import Canvas from "./Canvas";



function SendChats({token, messages, id}:{token?:string, messages:{message:string}[], id:number }) {

  const {socket}=useSocket(token)
  const [chats,setChats]=useState(messages)
  const [currentMessage,setCurrentMessage]=useState("")

  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(()=>{
    
   if(socket){
    //always first join the room 
    socket.send(JSON.stringify({
      type:"join_room",
      roomId:id
    }))


    //start listening to the incoming chats 
    socket.onmessage=(event)=>{
       const parsedData=JSON.parse(event.data)
       console.log(parsedData);
       if(parsedData.type==="chat"){
           setChats(c => [...c, {message:parsedData.message}])
       }
    }
   }

   return () => { 
    if (socket) socket.onmessage = null; 
  };
  },[socket, id])



  // const handleSend=()=>{
  //    socket?.send(JSON.stringify({
  //     type:"chat",
  //     message:currentMessage,
  //     roomId:id
  //    }))
  // }
  
   

  return (
    <>


      <Canvas socket={socket} id={id}/>
        
    
    {/* <div className="flex flex-col gap-2 justify-center items-center">
      <div>SendChats</div>
        <div>
            <input type="text" placeholder="send messages" className="border-[1px]" value={currentMessage} onChange={(e)=>{setCurrentMessage(e.target.value)}}/> 
            <button className="bg-black text-white" onClick={handleSend}>send</button>
        </div>
    </div> */}



    </>
  );
}

export default SendChats;
