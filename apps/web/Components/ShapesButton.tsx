import React from "react";
import {useState} from 'react'


function ShapesButton() {
   
const [active, setActive]=useState<"circle" | "rectangle" | "triangle">("circle")


  return (
    <>
      <div className="flex gap-4 p-2"> 
        <button className={active=='circle' ? "bg-red-200 p-3 rounded-full" : "bg-gray-200 p-3 rounded-full" } 
        onClick={()=>setActive("circle")}>
        C
        </button>
        <button className="bg-gray-200 p-3 rounded-full" onClick={select}>R</button>
        <button className="bg-gray-200 p-3 rounded-full" onClick={select}>T</button>
      </div>
    </>
  );
}

export default ShapesButton;
