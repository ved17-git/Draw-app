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


type SelectedShapeType = "circle" | "rectangle" | "eraser";


export const initializeDrawing=(canvas:HTMLCanvasElement, socket:WebSocket , id:number, shapes:Shapes[], selectedShape:SelectedShapeType)=>{

    const ctx = canvas.getContext("2d");
     
    if(!ctx){
        return
    }
    
    console.log(shapes);
    console.log(selectedShape);
    
    
    const existingShapes:Shapes[]=shapes


          

  socket.onmessage=(event)=>{
    const parsedData=JSON.parse(event.data)

    if(parsedData.type==="chat"){
      const data=JSON.parse(parsedData.message)
      existingShapes.push(data)
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
  
      //if rectangle is selected
      if(selectedShape==="rectangle"){
        const width=e.clientX-startX
        const height=e.clientY-startY

        const rectangle:Shapes={
          type:"rect",
          x:startX,
          y:startY,
          width:width,
          height:height
      }

      existingShapes.push(rectangle)

        socket.send(JSON.stringify({
        type:"chat",
        message:JSON.stringify({
          shape:rectangle
        }),
        roomId:id
      }))
    }

  //if circle is selected
    else if(selectedShape==="circle"){
          const x=e.clientX
          const y=e.clientY

          const cx = (startX + x) / 2;
          const cy = (startY + y) / 2;
          const rx = Math.abs(x - startX) / 2;  
          const ry = Math.abs(y - startY) / 2;


          const circle:Shapes={
            type:"circle",
            cx,
            cy,
            rx,
            ry
          }
          
          
          existingShapes.push(circle)

          socket.send(JSON.stringify({
            type:"chat",
            message:JSON.stringify({
              shape:circle
            }),
            roomId:id
          }))
        }

  
  });



    canvas.addEventListener("mousemove", (e) => {
      if (!clicked) return;

        const currentX = e.clientX;
        const currentY = e.clientY;

      
      clearCanvas(existingShapes, canvas, ctx)

      if(selectedShape==="rectangle"){
          const width = currentX - startX;
          const height = currentY - startY;

          ctx?.strokeRect(startX, startY, width, height)
          ctx.strokeStyle="rgba(255,255,255)"
      }

      // clearCanvas(existingShapes, canvas, ctx)

      if(selectedShape=="circle"){
        ctx.beginPath();
        const cx = (startX + currentX) / 2;
        const cy = (startY + currentY) / 2;
        const rx = Math.abs(currentX - startX) / 2;  // radiusX
        const ry = Math.abs(currentY - startY) / 2;  // radiusY
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
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
          }
        })

}