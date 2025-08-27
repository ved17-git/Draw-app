import React from "react";
import { BACKEND_URL } from "../app/config";


interface chats{
id:number,
message:string,
userId:number
}

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
    


  return (
    <>
      <div>All messages</div>
      {data.chats.map((item:chats)=>(
        <div key={item.id}>
            <p>{item.message}</p>
        </div>
      ))}
    </>
  );
}

export default GetChats;
