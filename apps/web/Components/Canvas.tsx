"use client"
import React, { useRef, useEffect } from "react";
import { initializeDrawing } from "../draw/draw";
import ShapesButton from "./ShapesButton";

interface canvasProps{
  socket:WebSocket ,
  id:number
  messages:any
}

function Canvas({socket, id, messages}:canvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);



  useEffect(() => {

    if(!canvasRef.current){
      return
    }
    initializeDrawing(canvasRef.current, socket, id, messages)

  }, [canvasRef]);







  return (
    <>

    <ShapesButton/>
      <canvas
        height={650}
        width={1400}
        ref={canvasRef}
      />
        

    </>
  );
}

export default Canvas;
