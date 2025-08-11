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