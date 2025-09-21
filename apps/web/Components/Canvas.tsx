"use client"
import React, { useRef, useEffect } from "react";
import { initializeDrawing } from "../draw/draw";
import {useState} from 'react'
import { FaRegCircle } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { BsEraser } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";

interface canvasProps{
  socket:WebSocket ,
  id:number
  shapes:any
}






function Canvas({socket, id, shapes}:canvasProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedShape, setSelectedShape]=useState<"circle" | "rectangle" | "eraser" | "pencil">("circle")

 
  useEffect(()=>{
    window.selectedShape=selectedShape
  },[selectedShape])


  useEffect(() => {

    if(!canvasRef.current){
      return
    }
    initializeDrawing(canvasRef.current, socket, id, shapes)

  }, [canvasRef, id, shapes, socket]);


  






  return (
    <>


      <div className="flex gap-4 p-2 fixed top-2"> 
            <button className={selectedShape=='circle' ? "bg-green-400 p-3 rounded-full scale-115" : "bg-gray-200 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setSelectedShape("circle")}>
            <FaRegCircle />
            </button>

            <button className={selectedShape=='rectangle' ? "bg-green-400 p-3 rounded-full scale-115" : "bg-gray-200 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setSelectedShape("rectangle")}>
            <RiRectangleLine />
            </button>
            
             <button className={selectedShape=='pencil' ? "bg-green-400 p-3 rounded-full scale-115" : "bg-gray-200 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setSelectedShape("pencil")}>
            <LuPencil />
            </button>

            <button className={selectedShape=='eraser' ? "bg-green-400 p-3 rounded-full scale-115" : "bg-gray-200 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setSelectedShape("eraser")}>
            <BsEraser />

            </button>
      </div>



    
      <canvas
        height={650}
        width={1536}
        ref={canvasRef}
      />
        

    </>
  );
}

export default Canvas;
