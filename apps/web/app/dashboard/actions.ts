"use server"
import { BACKEND_URL } from "app/config"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

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
    const data=await res.json()

    if(!res.ok){
        return data.msg
    }
    else if(data){
        revalidatePath('/dashboard')
    }
    else{
        return data
    }
    
}

