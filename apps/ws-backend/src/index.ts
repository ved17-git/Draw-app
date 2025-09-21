import WebSocket, { WebSocketServer } from 'ws';
import { Request } from 'express';
import { verifyToken } from './verify';
import { db } from '@repo/db/db';

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




console.log(`listening ws on ${port} joined user ${userId}`);


        socket.on("message", async (data)=>{
            
            //@ts-ignore

            let parsedData
            if(typeof data !="string"){
                parsedData=JSON.parse(data.toString())
            }else{
                parsedData=JSON.parse(data)
            }
            

            if(parsedData.type==="join_room"){
                const user=localDB.find(x => x.socket===socket)
                user?.rooms.push(parsedData.roomId)
                console.log(localDB);
            }

            if(parsedData.type==="leave_room"){
                const user=localDB.find(x => x.userId==userId)
                if(!user){
                    return
                }
                user.rooms = user.rooms.filter(room => room !== parsedData.roomId)
            }

            if(parsedData.type==="chat"){

                const roomId = String(parsedData.roomId)
                
                    await db.chats.create({
                        data:{
                            roomId:Number(roomId),
                            userId:userId,
                            message:parsedData.message
                        }
                    })

               
                localDB.forEach(x=>{
                    if(x.rooms.includes(parsedData.roomId)){
                        x.socket.send(JSON.stringify({
                            type:"chat",
                            message:parsedData.message,
                            roomId
                        }))
                    }
                    
                }) 
            }


            if (parsedData.type === "erase") {
                        const roomId = parsedData.roomId;

                        // 1) Remove the shape/chat row from DB
                        // (use deleteMany to match your existing style)
                        await db.chats.deleteMany({
                            where: {
                                id: parsedData.id
                            }
                        });

                        // 2) Broadcast an "erase" to everyone in the same room
                        localDB.forEach(x => {
                            if (x.rooms.includes(parsedData.roomId)) {
                                x.socket.send(JSON.stringify({
                                    type: "erase",
                                    id: parsedData.id,    // shape/chat id that was erased
                                    roomId                // keep type consistent with "chat" broadcasts
                            }));
                        }
                });
            }


            
        })

})
