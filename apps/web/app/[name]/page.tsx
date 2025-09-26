import React from "react";
import GetChats from "../../Components/GetChats";
import { BACKEND_URL } from "../config";
import { cookies } from "next/headers";


async function InRoom({ params }: { params: Promise<{ name: string }> }) {
   
  const cookieStore=await cookies()
  const token=cookieStore.get("token")?.value

  

  const { name } = await params; 
  const res=await fetch(`${BACKEND_URL}/joinRoom/${name}`,{
    method:"GET",
    headers:{
      "Authorization":`Bearer ${token}`,
      "Content-Type":"application/json"
    }
  })

  if(!res.ok){
      return "dawg"
  }

  const data=await res.json()
  
  
  

  return (
    <>
       
       <div>
          <GetChats id={data?.exists?.id} name={name}/>
       </div>

    </>
  );
}

export default InRoom;
