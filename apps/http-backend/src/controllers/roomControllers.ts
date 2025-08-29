import { NewRequest } from "../globalTypes"
import { Response } from "express"
import { db } from "@repo/db/db"

export const createRoom=async(req:NewRequest,res:Response)=>{

    const {name}=req.body
    const userId=req.userId as number

    try {

        const exists=await db.rooms.findFirst({
            where:{
                name:name
            }
        })

        if(exists){
        res.status(400).json({
            msg:"room name exists"
        })
        return
        }

        const room=await db.rooms.create({
            data:{
                name:name,
                createdAt: new Date(),
                userId:userId
            }
        })

        if(room){
        res.status(200).json({
        msg:"room created",
        room:room
        })
        return
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).json({
            msg:"api error"
        })
        return
    }
}


export const joinRoom=async(req:NewRequest,res:Response)=>{

    const name=req.params.room
    const userId=req.userId as number

    try {

        const exists=await db.rooms.findFirst({
            where:{
                name:name
            }
        })

        if(exists){
        res.status(200).json({
            msg:"room exists",
            exists:{
                id:exists.id,
                createdAt:exists.createdAt
            }

        })
        return
        }
        else{
        res.status(400).json({
            msg:"room not found, create new room"
        })
        return 
        }
        
    } catch (e) {
        console.log(e);
        res.status(400).json({
            msg:"api error"
        })
        return
    }



}




export const getChats=async(req:NewRequest,res:Response)=>{
    
    const roomId=Number(req.params.roomId)

    try {
    const chats=await db.chats.findMany({
       where:{
         roomId:roomId
       },
       take:50
    })

    res.status(200).json({
        msg:"chats",
        chats
    })
        
    } catch (e) {
        console.log(e);
        res.status(400).json({
            msg:"api error",
        })
        
    }

}