"use client"
import { useEffect, useState } from "react"
import { WS_URL } from "../app/config"


export const useSocket=(token?:string)=>{

    const [socket,setSocket]=useState<WebSocket>()

      useEffect(()=>{

        if(!token){
            return
        }
    
        const ws=new WebSocket(`${WS_URL}/join?token=${token}`)
        ws.onopen=()=>{
            setSocket(ws)
            console.log("connected");
        }
    
        ws.onclose=()=>{
          console.log("disconnected");
          
          return
        }
        
      },[token])

    return {socket}

}