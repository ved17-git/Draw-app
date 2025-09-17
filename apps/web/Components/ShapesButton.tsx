import React from "react";
import {useState} from 'react'
import { FaRegCircle } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { BsEraser } from "react-icons/bs";




function ShapesButton() {
   
const [currentShape, setCurrentShape]=useState<"circle" | "rectangle" | "eraser" | null>(null)



  return (
    <>
      <div className="flex gap-4 p-2 fixed top-2"> 
            <button className={currentShape=='circle' ? "bg-green-400 p-3 rounded-full scale-110" : "bg-gray-200 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setCurrentShape("circle")}>
            <FaRegCircle />
            </button>

            <button className={currentShape=='rectangle' ? "bg-green-400 p-3 rounded-full scale-110" : "bg-gray-200 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setCurrentShape("rectangle")}>
            <RiRectangleLine />
            </button>

            <button className={currentShape=='eraser' ? "bg-green-400 p-3 rounded-full scale-110" : "bg-gray-200 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setCurrentShape("eraser")}>
            <BsEraser />

            </button>
      </div>
    </>
  );
}

export default ShapesButton;
