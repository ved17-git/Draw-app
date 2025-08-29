"use server"
import { redirect } from "next/navigation"
import { BACKEND_URL } from "../../app/config"


export const getRoomId=async(previousState:unknown, formData:FormData)=>{

  const name=formData.get('name')
    

  const res=await fetch(`${BACKEND_URL}/joinRoom/${name}`,{
    method:"GET",
  })
  

  if(!res.ok){    
    return "Room not found"
  }
  redirect(`/${name}`)
}
