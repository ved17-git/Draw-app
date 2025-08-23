import React from "react";
import { BACKEND_URL } from "../config";
import { redirect } from "next/navigation";

async function InRoom({ params }: { params: { room: string } }) {
  const res = await fetch(`${BACKEND_URL}/joinRoom/${params.room}`, {
    method: "GET",
  });

  if (!res.ok) {
    redirect("/");
  }
  const data = await res.json();

  const id = data.exists.id;
  console.log(id);

  return (
    <>
      <div>InRoom {params.room}</div>
       

       <div>
           <p>Messages</p>

           <div>
            <input type="text" placeholder="send messages"/> 
            <button>send</button>
           </div>
         
       </div>

    </>
  );
}

export default InRoom;
