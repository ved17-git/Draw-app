"use client"
import React, { useRef, useEffect } from "react";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    console.log(ctx?.arc);
    
    


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
      // alert(`start: ${startX} ${startY}  end: ${e.clientX} ${e.clientY}`)
      console.log("Mouse up:", e.offsetX, e.offsetY);
    });

    // mousemove
    canvas.addEventListener("mousemove", (e) => {
      if (!clicked) return;
      const currentX = e.clientX;
      const currentY = e.clientY;
      const width = currentX - startX;
      const height = currentY - startY;

      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      


    });


  }, []);





  return (
    <>
      <canvas
        height={650}
        width={1400}
        className="bg-neutral-500"
        ref={canvasRef}
      />
    </>
  );
}

export default Canvas;
