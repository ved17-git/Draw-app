"use client"
import React, { useRef, useEffect } from "react";
import { initializeDrawing } from "../draw/draw";



function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);



  useEffect(() => {

    if(!canvasRef.current){
      return
    }
    initializeDrawing(canvasRef.current)

  }, [canvasRef]);







  return (
    <>
      <canvas
        height={650}
        width={1400}
        ref={canvasRef}
      />
        

    </>
  );
}

export default Canvas;
