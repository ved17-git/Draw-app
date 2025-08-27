import React from "react";
import GetChats from "../../Components/GetChats";
import SendChats from "../../Components/SendChats";


async function InRoom({ params }: { params: {id:number} }) {

    

  return (
    <>
      <div>Currently in Room {params.id}</div>
       

       <div>
          <GetChats id={params.id}/>
          <SendChats/>
       </div>

    </>
  );
}

export default InRoom;
