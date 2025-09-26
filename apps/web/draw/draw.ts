import type { Shapes } from "../types/shapes"




export const initializeDrawing=(canvas:HTMLCanvasElement, socket:WebSocket , id:number, shapes:Shapes[], )=>{

    const ctx = canvas.getContext("2d");
     
    if(!ctx){
        return
    }
    
    console.log(shapes);
    
    
  let existingShapes:Shapes[]=shapes
  let currentPath: {x:number, y:number}[] = [];
  let isDrawing = false;
          

socket.onmessage = (event) => {
  const parsedData = JSON.parse(event.data);

if (parsedData.type === "chat") {
  const data = JSON.parse(parsedData.message);
  const shapeWithId: Shapes = { ...data.shape, id: parsedData.dbId };

  // Prevent duplicate push if we already have this id
  if (!existingShapes.some(s => s.id === shapeWithId.id)) {
    existingShapes.push(shapeWithId);
    clearCanvas(existingShapes, canvas, ctx);
  }
}

  if (parsedData.type === "erase") {
    // Remove shapes by dbId
    const erasedIds = parsedData.ids;
    existingShapes = existingShapes.filter(s => !erasedIds.includes(s.id));
    clearCanvas(existingShapes, canvas, ctx);
  }
};

  

  

    clearCanvas(existingShapes, canvas, ctx)

    let clicked = false;
    let startX = 0;
    let startY = 0;



    canvas.addEventListener("mousedown", (e) => {
      clicked = true;
      startX = e.clientX;
      startY = e.clientY;
      if (window.selectedShape === "pencil") {
          isDrawing = true;
          currentPath = [{ x: startX, y: startY }];
      }
    });
   
  

    canvas.addEventListener("mouseup", (e) => {
      
      if(!clicked){
        return
      }
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

      else if (selectedShape === "pencil") {
        if (currentPath.length > 1) {
            shape = {
                type: "path",
                points: currentPath
            };
        }
        isDrawing = false;
        currentPath = [];
      }

        if(!shape){
          return
        }

        // existingShapes.push(shape)
         
        socket.send(JSON.stringify({
        type:"chat",
        message:JSON.stringify({
          shape
        }),
        roomId:id
      }))

      console.log(existingShapes);
      
  
  });



    canvas.addEventListener("mousemove", (e) => {
      if (!clicked && !isDrawing) return;

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


      else if (selectedShape === "pencil" && isDrawing) {
        currentPath.push({ x: currentX, y: currentY });
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255)";
        ctx.lineWidth = 2;

        // Add a check to ensure the array is not empty
        if (currentPath.length > 0) {
          ctx.moveTo(currentPath[0]!.x, currentPath[0]!.y);
          for (let i = 1; i < currentPath.length; i++) {
              ctx.lineTo(currentPath[i]!.x, currentPath[i]!.y);
          }
        }

        ctx.stroke();
        ctx.closePath();
      }



// The eraser logic in your mousemove event listener
else if (selectedShape === "eraser") {
    const erasedIds:number[] = [];

    const filteredArr = existingShapes.filter((item) => {
        if (item.type === "rect") {
            const inside =
              e.clientX >= item.x &&
              e.clientX <= item.x + item.width &&
              e.clientY >= item.y &&
              e.clientY <= item.y + item.height;

            if (inside) erasedIds.push(item.id!);
            return !inside;
        }

        else if (item.type === "circle") {
            const inside =
                ((e.clientX - item.cx) ** 2) / (item.rx ** 2) +
                ((e.clientY - item.cy) ** 2) / (item.ry ** 2) <= 1;

            if (inside) erasedIds.push(item.id!);
            return !inside;
        }

        // --- PENCIL CHECK ---
        else if (item.type === "path") {
            // Re-draw the path to check if the point is within its stroke
            ctx.beginPath();
            ctx.lineWidth = 10; // Use a wider line to make erasing easier
            ctx.moveTo(item.points[0]!.x, item.points[0]!.y);
            for (let i = 1; i < item.points.length; i++) {
                ctx.lineTo(item.points[i]!.x, item.points[i]!.y);
            }

            // The isPointInStroke() method checks if the point is on the stroke of the current path.
            const inside = ctx.isPointInStroke(e.clientX, e.clientY);
            ctx.closePath();
            
            if (inside) erasedIds.push(item.id!);
            return !inside;
        }

        return true; // Keep shapes of other types
    });

    existingShapes.splice(0, existingShapes.length, ...filteredArr);

    if (erasedIds.length > 0) {
        socket.send(JSON.stringify({
            type: "erase",
            ids: erasedIds,
            roomId: id
        }));
    }

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
          ctx.lineWidth = 2;

          if (shape.type === "rect") {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
          } 
          
          else if (shape.type === "circle") {
            ctx.beginPath()
            ctx.ellipse(shape.cx, shape.cy, shape.rx, shape.ry, 0, 0, Math.PI * 2)
            ctx.stroke()
            ctx.closePath()
          }

          else if (shape.type === "path") {
            ctx.beginPath();
            ctx.moveTo(shape.points[0]!.x, shape.points[0]!.y);
            for (let i = 1; i < shape.points.length; i++) {
                ctx.lineTo(shape.points[i]!.x, shape.points[i]!.y);
            }
            ctx.stroke();
            ctx.closePath();
        }
        })

}


