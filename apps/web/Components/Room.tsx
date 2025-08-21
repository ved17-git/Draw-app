"use client"
import React from "react";
import {useEffect} from 'react'
import { WS_URL } from "../app/config";



function Room({token}:{token?:string}) {

  console.log(token);
  

  useEffect(()=>{

   
    const ws=new WebSocket(`${WS_URL}/join?token=${token}`)

    ws.onopen=()=>{
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
    </>
  );
}

export default Room;
