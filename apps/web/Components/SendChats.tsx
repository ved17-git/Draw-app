import React from "react";

function SendChats() {
  return (
    <>
    
    <div className="flex flex-col gap-2 justify-center items-center">
      <div>SendChats</div>
        <div>
            <input type="text" placeholder="send messages" className="border-[1px]"/> 
            <button className="bg-black text-white">send</button>
        </div>
    </div>
    </>
  );
}

export default SendChats;
