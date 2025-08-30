"use client"
import React, { useEffect } from "react";
import { useRef } from "react";

function Canvas() {
  
    const canvasRef=useRef<HTMLCanvasElement>(null)

    useEffect(()=>{

        if(canvasRef.current){

           const canvas=canvasRef.current  //gives us a canvas  (ex: <canvas>...</canvas>)
           const ctx=canvas.getContext("2d")
           console.log(canvas);
           
           ctx?.strokeRect(100,100,60,60)       //x, y, width, height -> x,y measured from the canvas div, not the whole page

           canvas.addEventListener("mousedown",(e)=>{
            console.log(e.clientX, e.clientY);
           })

           canvas.addEventListener("mouseup",(e)=>{
               console.log(e.clientX, e.clientY);  
           })     
        }
    

    },[])


  return (
    <>
      <div>Canvas</div>
      <canvas height={500} width={1000} ref={canvasRef}></canvas>
    </>
  );
}

export default Canvas;
