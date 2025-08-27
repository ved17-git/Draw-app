import React from "react";
import { redirect } from "next/navigation";
import GetChats from "../../Components/GetChats";


async function InRoom({ params }: { params: {id:number} }) {

    

  return (
    <>
      <div>InRoom {params.id}</div>
       

       <div>
           <GetChats id={params.id}/>

           <div>
            <input type="text" placeholder="send messages"/> 
            <button>send</button>
           </div>
         
       </div>

    </>
  );
}

export default InRoom;
