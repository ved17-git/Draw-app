import React from "react";
import { redirect } from "next/navigation";

async function InRoom({ params }: { params: {id:string } }) {

    console.log(params.id);
    

  return (
    <>
      <div>InRoom {params.id}</div>
       

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
