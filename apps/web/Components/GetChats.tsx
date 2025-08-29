import React from "react";
import { BACKEND_URL } from "../app/config";
import SendChats from "./SendChats";
import { cookies } from "next/headers";


async function GetChats({id}:{id:number}) {

    
    const res=await fetch(`${BACKEND_URL}/chats/${id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    
    if(!res.ok){
        return <div>Fetching error </div>
    }
    const data=await res.json()    
    console.log(data);

    const cookieStore=await cookies()
    const token=cookieStore.get('token')?.value
    
    


  return (
    <>
      <SendChats messages={data.chats} token={token}/>
    </>
  );
}

export default GetChats;
