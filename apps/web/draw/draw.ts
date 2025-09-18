interface Shapes{
type:"rect",
x:number,
y:number,
height:number,
width:number
}


export const initializeDrawing=(canvas:HTMLCanvasElement, socket:WebSocket , id:number, shapes:Shapes[])=>{

    const ctx = canvas.getContext("2d");
     
    if(!ctx){
        return
    }

    const existingShapes:Shapes[]=shapes


          

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
      const width=e.clientX-startX
      const height=e.clientY-startY

      console.log(startX, startY, width, height);

      const shape:Shapes={
        type:"rect",
        x:startX,
        y:startY,
        width:width,
        height:height
      }
      
      
      // existingShapes.push(shape)

      // socket.send(JSON.stringify({
      //   type:"chat",
      //   message:JSON.stringify({
      //     shape
      //   }),
      //   roomId:id
      // }))
    });



    canvas.addEventListener("mousemove", (e) => {
      if (!clicked) return;
      const currentX = e.clientX;
      const currentY = e.clientY;
      const width = currentX - startX;
      const height = currentY - startY;
      

      clearCanvas(existingShapes, canvas, ctx)

      const x=e.clientX
      const y=e.clientY

      ctx.beginPath();
      const cx = (startX + x) / 2;
      const cy = (startY + y) / 2;
      const rx = Math.abs(x - startX) / 2;  // radiusX
      const ry = Math.abs(y - startY) / 2;  // radiusY
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();


      // ctx?.strokeRect(startX, startY, width, height)
      // ctx.strokeStyle="rgba(255,255,255)"
      
    });
}


const clearCanvas=(existingShapes:Shapes[], canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D)=>{

      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle="rgba(0,0,0)";
      ctx.fillRect(0,0, canvas.width, canvas.height);
           

     ctx.strokeStyle="rgba(255,255,255)"
        ctx.beginPath();
      ctx.arc(200, 200, 100, 0, 2 * Math.PI);
      ctx.stroke();;
    
      
       ctx.strokeStyle="rgba(255,255,255)"
ctx.beginPath(); // Start a new path
ctx.moveTo(100, 100); // Move the pen to (30, 50)
ctx.lineTo(150, 100); // Draw a line to (150, 100)
ctx.stroke(); // Render the path


      existingShapes.map((shape)=>{
        if(shape.type==="rect"){
            ctx.strokeStyle="rgba(255,255,255)"
            ctx?.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
      })

}