import WebSocket, { WebSocketServer } from 'ws';
import { Request } from 'express';
import { verifyToken } from './verify';

const port=8001
const wss=new WebSocketServer({port:port})

interface typeLocalDb{
    userId:number,
    rooms:number[]
    socket:WebSocket
}

    
const localDB:typeLocalDb[]=[]

wss.on("connection",(socket, req)=>{

    const url=req.url  //url=/join?token=abc
    if(!url){
    return
    }
    const t=url.split('?')[1];  //url=["/join","token=abc"]
    const params=new URLSearchParams(t); //pass string in it 
    const token=params.get('token');

    const userId=verifyToken(token as string)

    if(userId==null){
        socket.close()
        return
    }

    localDB.push({
        userId:userId,
        rooms:[],
        socket
    })




    

console.log(`listening ws on ${port}`);

        socket.on("message",(data)=>{
            
            if(typeof data !="string"){
                return
            }
            const parsedData=JSON.parse(data)

            if(parsedData.type==="join_room"){
                const user=localDB.find(x => x.userId==userId)
                //@ts-ignore
                user?.rooms.push(parsedData.roomId)
            }

            if(parsedData.type==="leave_room"){
                const user=localDB.find(x => x.userId==userId)
                if(!user){
                    return
                }
                user.rooms = user.rooms.filter(room => room !== parsedData.roomId)
            }

            
        })

})
