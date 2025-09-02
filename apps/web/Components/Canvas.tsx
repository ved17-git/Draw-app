"use client"
import React, { useRef, useEffect } from "react";

interface Shapes{
type:"rect",
x:number,
y:number,
height:number,
width:number
}


function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const  existingShape:Shapes[]=[]

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;  
    const ctx = canvas.getContext("2d");
    if(!ctx){
      return
    }

    ctx.fillStyle="rgba(0,0,0)";
    ctx.fillRect(0,0, canvas.width, canvas.height)


    


    let clicked = false;
    let startX = 0;
    let startY = 0;


    // mousedown
    canvas.addEventListener("mousedown", (e) => {
      clicked = true;
      startX = e.clientX;
      startY = e.clientY;
    });

    // mouseup
    canvas.addEventListener("mouseup", (e) => {
      clicked = false;
      const width=startX-e.clientX
      const height=startY-e.clientY

      existingShape.push({
        type:"rect",
        x:startX,
        y:startY,
        width:width,
        height:height
      })

    });

    // mousemove
    canvas.addEventListener("mousemove", (e) => {
      if (!clicked) return;
      const currentX = e.clientX;
      const currentY = e.clientY;
      const width = currentX - startX;
      const height = currentY - startY;

      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle="rgba(0,0,0)";
      ctx.fillRect(0,0, canvas.width, canvas.height)
      ctx?.strokeRect(startX, startY, width, height)
      ctx.strokeStyle="rgba(255,255,255)"
      
    });
  }, []);







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
