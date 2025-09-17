"use client"
import { getRoomId } from "./action";
import { useActionState } from "react";


function JoinRoom() {
  const [data, action, isLoading]=useActionState(getRoomId, undefined)
  
  //u dont have to join the room here using websocket (ex: type:"join_room")
  //this will create another ws server connection

  return (
    <>        
      <form action={action}>
         <div className="mt-3">
            <input type="text" placeholder="Join Room" className="border-[1px]" name="name"/>
            <button type="submit" className="bg-black text-white">
               {isLoading? "Joining..." : "Join Room"}
             </button>
         </div>
      </form>
      {data && data}
    </>
  ); 
}

export default JoinRoom;
