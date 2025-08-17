"use server"
import { redirect } from "next/navigation"
import { BACKEND_URL } from "../../config"
import { cookies } from "next/headers"

export const logout=async():Promise<void>=>{

     const cookieStore=await cookies()
     const token=cookieStore.get("token")


  const res=await fetch(`${BACKEND_URL}/logout`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
    }
  })

  if(!res.ok){
    return 
  }
   
  cookieStore.delete("token")
  redirect('/')
}