

type rectangle={
  type:"rect",
  x:number,
  y:number,
  height:number,
  width:number
}

type circle={
  type:"circle",
  cx:number,
  cy:number,
  rx:number,
  ry:number
}

type Shapes=rectangle | circle


// type SelectedShapeType = "circle" | "rectangle" | "eraser";
declare global {
  interface Window {
    selectedShape: "circle" | "rectangle" | "eraser";
  }
}


export const initializeDrawing=(canvas:HTMLCanvasElement, socket:WebSocket , id:number, shapes:Shapes[], )=>{

    const ctx = canvas.getContext("2d");
     
    if(!ctx){
        return
    }
    
    console.log(shapes);
    
    
    const existingShapes:Shapes[]=shapes
  console.log(existingShapes);
  


    


          

  socket.onmessage=(event)=>{
    const parsedData=JSON.parse(event.data)

    if(parsedData.type==="chat"){
      const data=JSON.parse(parsedData.message)
      existingShapes.push(data.shape)
      clearCanvas(existingShapes, canvas, ctx)
    }
  }
  

    
   



    clearCanvas(existingShapes, canvas, ctx)

    let clicked = false;
    let startX = 0;
    let startY = 0;



    canvas.addEventListener("mousedown", (e) => {
      clicked = true;
      
      startX = e.clientX;
      startY = e.clientY;
    });
   
  

    canvas.addEventListener("mouseup", (e) => {
      clicked = false;
      
      const selectedShape=window.selectedShape
      let shape:Shapes|null=null;

      if(selectedShape==="rectangle"){
        const width=e.clientX-startX
        const height=e.clientY-startY

        shape={
          type:"rect",
          x:startX,
          y:startY,
          width:width,
          height:height
      }

    }

  //if circle is selected
    else if(selectedShape==="circle"){
          const x=e.clientX
          const y=e.clientY

          const cx = (startX + x) / 2;
          const cy = (startY + y) / 2;
          const rx = Math.abs(x - startX) / 2;  
          const ry = Math.abs(y - startY) / 2;


          shape={
            type:"circle",
            cx,
            cy,
            rx,
            ry
          }
          
        }

        if(!shape){
          return
        }

        existingShapes.push(shape)


         
        socket.send(JSON.stringify({
        type:"chat",
        message:JSON.stringify({
          shape
        }),
        roomId:id
      }))
  
  });



    canvas.addEventListener("mousemove", (e) => {
      if (!clicked) return;

        const currentX = e.clientX;
        const currentY = e.clientY;

      
      clearCanvas(existingShapes, canvas, ctx)
      const selectedShape=window.selectedShape

      if(selectedShape==="rectangle"){
          const width = currentX - startX;
          const height = currentY - startY;

          ctx?.strokeRect(startX, startY, width, height)
          ctx.strokeStyle="rgba(255,255,255)"
      }


      else if(selectedShape=="circle"){
        ctx.beginPath();
        const cx = (startX + currentX) / 2;
        const cy = (startY + currentY) / 2;
        const rx = Math.abs(currentX - startX) / 2;  // radiusX
        const ry = Math.abs(currentY - startY) / 2;  // radiusY
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath()
      }

      else if (selectedShape === "eraser") {
        const filteredArr = existingShapes.filter((item) => {
              if (item.type === "rect") {
                return !(
                  e.clientX >= item.x &&
                  e.clientX <= item.x + item.width &&
                  e.clientY >= item.y &&
                  e.clientY <= item.y + item.height
                );
              }
              // circle
              const inside =
                ((e.clientX - item.cx) ** 2) / (item.rx ** 2) +
                ((e.clientY - item.cy) ** 2) / (item.ry ** 2) <= 1;
              return !inside;
            });

            // keep the same array reference:
            existingShapes.splice(0, existingShapes.length, ...filteredArr);

            // redraw
            clearCanvas(existingShapes, canvas, ctx);
        }


      
    });
}


const clearCanvas=(existingShapes:Shapes[], canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D)=>{

      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle="rgba(0,0,0)";
      ctx.fillRect(0,0, canvas.width, canvas.height);
           
  
     

    
        existingShapes.forEach((shape) => {
          if (!shape) return; // guard against bad pushes
          ctx.strokeStyle = "rgba(255,255,255)"

          if (shape.type === "rect") {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
          } 
          else if (shape.type === "circle") {
            ctx.beginPath()
            ctx.ellipse(shape.cx, shape.cy, shape.rx, shape.ry, 0, 0, Math.PI * 2)
            ctx.stroke()
            ctx.closePath()
          }
        })

}