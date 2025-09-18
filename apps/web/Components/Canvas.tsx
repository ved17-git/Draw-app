"use client"
import React, { useRef, useEffect } from "react";
import { initializeDrawing } from "../draw/draw";
import ShapesButton from "./ShapesButton";


interface canvasProps{
  socket:WebSocket ,
  id:number
  shapes:any
}

function Canvas({socket, id, shapes}:canvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);



  useEffect(() => {

    if(!canvasRef.current){
      return
    }
    initializeDrawing(canvasRef.current, socket, id, shapes)

  }, [canvasRef, id, shapes, socket]);







  return (
    <>

    <ShapesButton/>
      <canvas
        height={650}
        width={1536}
        ref={canvasRef}
      />
        

    </>
  );
}

export default Canvas;
