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

                if (parsedData.type === "chat") {
                    const roomId = Number(parsedData.roomId);

                    // save in DB
                    const saved = await db.chats.create({
                        data: {
                            roomId,
                            userId,
                            message: parsedData.message
                        }
                    });

                    // broadcast to everyone in the room with dbId
                    localDB.forEach(x => {
                        if (x.rooms.includes(roomId)) {
                            x.socket.send(JSON.stringify({
                                type: "chat",
                                message: parsedData.message,
                                dbId: saved.id,  // ✅ send DB id back
                                roomId
                            }));
                        }
                    });
                }



            if (parsedData.type === "erase") {
                        const roomId = Number(parsedData.roomId);
                        const ids = parsedData.ids;
                   //erasing but not the shapes 
                        if (!ids || ids.length === 0) {
                            return; // nothing to delete
                        }

                        try {
                            await db.chats.deleteMany({
                            where: {
                                id: { in: parsedData.ids }
                            }
                            });
                        } catch (e) {
                            console.log(e);
                            
                        }
                           

                        // 2) Broadcast an "erase" to everyone in the same room
                        localDB.forEach(x => {
                            if (x.rooms.includes(parsedData.roomId)) {
                                x.socket.send(JSON.stringify({
                                    type: "erase",
                                    ids: parsedData.ids,    // shape/chat id that was erased
                                    roomId                // keep type consistent with "chat" broadcasts
                            }));
                        }
                });
            }


            
        })

})
