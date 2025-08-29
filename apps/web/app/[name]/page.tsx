import React from "react";
import GetChats from "../../Components/GetChats";
import SendChats from "../../Components/SendChats";
import { BACKEND_URL } from "../config";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


async function InRoom({ params }: { params: Promise<{ name: string }> }) {

  const { name } = await params; 
  const res=await fetch(`${BACKEND_URL}/joinRoom/${name}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }
  })

  if(!res.ok){
      return "dawg"
  }

  const data=await res.json()
  console.log(data);

  const cookieStore=await cookies()
  const token=cookieStore.get('token')?.value
  
  console.log(token);
  

    

  return (
    <>
      <div>Currently in Room {name}</div>
       
       <div>
          <GetChats id={data?.exists?.id}/>
       </div>

    </>
  );
}

export default InRoom;
