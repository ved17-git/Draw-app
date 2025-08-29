import React from "react";
import GetChats from "../../Components/GetChats";
import SendChats from "../../Components/SendChats";
import { BACKEND_URL } from "../config";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


async function InRoom({ params }:{params:{name:string}}) {

  const res=await fetch(`${BACKEND_URL}/joinRoom/${params.name}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json"
    }
  })

  if(!res.ok){
    redirect('/')
  }

  const data=await res.json()
  console.log(data);

  const cookieStore=await cookies()
  const token=cookieStore.get('token')?.value
  
  console.log(token);
  

    

  return (
    <>
      <div>Currently in Room {params.name}</div>
       
       <div>
          <GetChats id={data?.exists?.id}/>
       </div>

    </>
  );
}

export default InRoom;
