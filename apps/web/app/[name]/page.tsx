import React from "react";
import GetChats from "../../Components/GetChats";
import SendChats from "../../Components/SendChats";
import { BACKEND_URL } from "../config";
import { redirect } from "next/navigation";


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
  

    

  return (
    <>
      <div>Currently in Room {params.name}</div>
       

       <div>
          <GetChats id={data?.exists?.id}/>
          <SendChats/>
       </div>

    </>
  );
}

export default InRoom;
