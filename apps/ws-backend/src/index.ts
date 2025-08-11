import WebSocket, { WebSocketServer } from 'ws';
import { Request } from 'express';

const port=8001
const wss=new WebSocketServer({port:port})

wss.on("connection",(socket, req)=>{
    

console.log(`listening ws on ${port}`);

socket.on("message",(data)=>{
    socket.send("dawg");
})

})
