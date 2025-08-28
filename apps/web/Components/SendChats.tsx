"use client"
import React from "react";
import { useSocket } from "../hooks/useSocket";
import {useEffect, useState} from 'react'

function SendChats({token}:{token?:string}) {

  const {socket}=useSocket(token)

  // const [messages,setMessages]=useState("")
  console.log(socket);
  
   

  return (
    <>
    
    <div className="flex flex-col gap-2 justify-center items-center">
      <div>SendChats</div>
        <div>
            <input type="text" placeholder="send messages" className="border-[1px]"/> 
            <button className="bg-black text-white">send</button>
        </div>
    </div>
    </>
  );
}

export default SendChats;
