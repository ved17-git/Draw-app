"use server"
import { BACKEND_URL } from "../../app/config"


export const getRoomId=async(name:string)=>{
    

  const res=await fetch(`${BACKEND_URL}/joinRoom/${name}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }
  })
  

  if(!res.ok){    
    return  
  }

  const data=await res.json()
  return data?.exists?.id
}
