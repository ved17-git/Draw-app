"use server"
import { redirect } from "next/navigation"
import { BACKEND_URL } from "../../app/config"
import { cookies } from "next/headers"

export const getRoomId=async(previousState:unknown, formData:FormData)=>{

  const name=formData.get('name')
  
  const cookieStore=await cookies()
  const token=cookieStore.get("token")?.value

  const res=await fetch(`${BACKEND_URL}/joinRoom/${name}`,{
    method:"GET",
    headers:{
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }
  })
   
  const data=await res.json()
  console.log(data);  

  if(!res.ok){    
    return data.msg
  }
  redirect(`/${name}`)
}
