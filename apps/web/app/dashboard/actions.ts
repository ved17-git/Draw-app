"use server"
import { BACKEND_URL } from "app/config"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const createRoom=async(previousState:unknown, formData:FormData)=>{

    const name=formData.get("name")
    const cookieStore=await cookies()
    const token=cookieStore.get("token")?.value

    


     
    const res=await fetch(`${BACKEND_URL}/createRoom`,{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
        },
       body:JSON.stringify({name})
    })
    
    if(!res.ok){
        return "Create room error"
    }
    const data=await res.json()
    if(data){
        revalidatePath('/dashboard')
    }
    else{
        return data
    }
    
}

