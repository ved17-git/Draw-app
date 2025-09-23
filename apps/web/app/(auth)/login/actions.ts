"use server"
import { redirect } from "next/navigation"
import { BACKEND_URL } from "../../config"
import { cookies } from "next/headers"

export const login=async(previousState:unknown, formData:FormData):Promise<string |void>=>{

const email=formData.get("email")
const password=formData.get("password")


const res = await fetch(`${BACKEND_URL}/login`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
})


if(!res.ok){
  return "Login error"
}

const data=await res.json()

const cookieStore=await cookies()
cookieStore.set("token",data.token,{
    httpOnly:true,
    maxAge:60*60*3
})

redirect('/')
}


export const signUp=async(previousState:unknown ,formData:FormData):Promise<string |void>=>{

  const username=formData.get("username")
  const email=formData.get("email")
  const password=formData.get("password")

  const res=await fetch(`${BACKEND_URL}/signUp`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({username,email,password})
  })

  if(!res.ok){
    return "SignUp error"
  }
  redirect('/login')


}