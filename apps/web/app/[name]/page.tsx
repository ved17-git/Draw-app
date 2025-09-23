import React from "react";
import GetChats from "../../Components/GetChats";
import { BACKEND_URL } from "../config";


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
  
  

  return (
    <>
       
       <div>
          <GetChats id={data?.exists?.id}/>
       </div>

    </>
  );
}

export default InRoom;
