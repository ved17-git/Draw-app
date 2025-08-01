import WebSocket, { WebSocketServer } from 'ws';

const port=8001
const wss=new WebSocketServer({port:port})

wss.on("connection",(socket)=>{

console.log(`listening ws on ${port}`);

socket.on("message",(data)=>{
    socket.send("dawg");
})

})
