import WebSocket, { WebSocketServer } from 'ws';
import { Request } from 'express';
import { verifyToken } from './verify';

const port=8001
const wss=new WebSocketServer({port:port})

wss.on("connection",(socket, req)=>{

    const url=req.url
    if(!url){
    return
    }
    const t=url.split('?')[1];
    const params=new URLSearchParams(t);
    const token=params.get('token');

    const userId=verifyToken(token as string)
    console.log(userId);
    



    
     
     
    
    
    
    //only logged in user can go forward else return 
    

console.log(`listening ws on ${port}`);

        socket.on("message",(data)=>{
            socket.send("dawg");
        })

})
