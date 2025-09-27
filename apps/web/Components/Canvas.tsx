"use client"
import React, { useRef, useEffect } from "react";
import { initializeDrawing } from "../draw/draw";
import {useState} from 'react'
import { FaRegCircle } from "react-icons/fa";
import { RiRectangleLine } from "react-icons/ri";
import { BsEraser } from "react-icons/bs";
import { LuPencil } from "react-icons/lu";
import type { Shapes } from "../types/shapes";
import {
  Copy,
  Check,
} from "lucide-react"



interface canvasProps{
  socket:WebSocket ,
  id:number
  shapes:Shapes[]
  name:string
}






function Canvas({socket, id, shapes, name}:canvasProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedShape, setSelectedShape]=useState<"circle" | "rectangle" | "eraser" | "pencil">("circle")
   
  console.log(shapes);
  
 
  useEffect(()=>{
    window.selectedShape=selectedShape
  },[selectedShape])


  useEffect(() => {

    if(!canvasRef.current){
      return
    }
    initializeDrawing(canvasRef.current, socket, id, shapes)

  }, [canvasRef, id, shapes, socket]);


    const [isCopied, setIsCopied] = useState(false)

  const copyRoomName = async () => {
    try {
      await navigator.clipboard.writeText(decodeURIComponent(name))
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy room name:", err)
    }
  }





  return (
    <>


      <div className="flex gap-4 p-2 fixed top-2"> 
            <button className={selectedShape=='circle' ? "bg-green-500 p-3 rounded-full scale-115" : "bg-gray-400 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setSelectedShape("circle")}>
            <FaRegCircle />
            </button>

            <button className={selectedShape=='rectangle' ? "bg-green-500 p-3 rounded-full scale-115" : "bg-gray-400 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setSelectedShape("rectangle")}>
            <RiRectangleLine />
            </button>
            
             <button className={selectedShape=='pencil' ? "bg-green-500 p-3 rounded-full scale-115" : "bg-gray-400 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setSelectedShape("pencil")}>
            <LuPencil />
            </button>

            <button className={selectedShape=='eraser' ? "bg-green-500 p-3 rounded-full scale-115" : "bg-gray-400 p-3 rounded-full hover:scale-110 cursor-pointer transition-all ease-in-out" } 
            onClick={()=>setSelectedShape("eraser")}>
            <BsEraser />

          </button>
      </div>



    
    <div className="overflow-hidden h-screen"> 
      <div
        className="fixed right-3 top-2 z-50 cursor-pointer group"
        onClick={copyRoomName}
        title="Click to copy room name"
      >
        <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2 hover:bg-card/90 transition-all duration-200">
          <span className="text-sm font-medium text-foreground"> {decodeURIComponent(name)}</span>
          {isCopied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          )}
        </div>
        {isCopied && <div className="absolute top-full right-0 mt-1 text-xs text-green-500 font-medium">Copied!</div>}
      </div>
        <canvas
        height={window.innerHeight}
        width={window.innerWidth}
        ref={canvasRef}      
      />

    </div>
        

    </>
  );
}

export default Canvas;
