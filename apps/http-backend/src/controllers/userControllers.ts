import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { db } from "@repo/db/db"
import {JWT_SECRET} from '@repo/backend-common/config'
import bcrypt from 'bcrypt'

export const signUp=async (req:Request,res:Response)=>{

const {username, email, password}=req.body

try {
const existingUser=await db.user.findFirst({
    where:{
        email:email
    }
})

if(existingUser){
    res.status(400).json({
    msg:"user/email already exists"
    })
    return
}

const hashedPassword=await bcrypt.hash(password,10)

const user=await db.user.create({
    data:{
        username:username,
        email:email,
        password:hashedPassword
    }
})

if(user){
    res.status(200).json({
    msg:"user created",
    data:{
        id:user.id,
        username:user.username,
        email:user.email
    }
    })
    return
}
    
} 
catch (e) {
    console.log(e);
    res.status(400).json({
    msg:"api error"
    })
    
}

}






export const login=async(req:Request,res:Response)=>{

const {email, password}=req.body

try {
    
   const existingUser=await db.user.findFirst({
    where:{
        email:email
    }
  })

  if(!existingUser){
    res.status(400).json({
    msg:"user not found"
    })
    return
  }
   
const token=jwt.sign({userId:existingUser.id}, JWT_SECRET as string)
const passwordMatch=await bcrypt.compare(password,existingUser.password)

if(passwordMatch){
    res.status(200).json({
    msg:"logged in",
    token
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


export const logout=(req:Request, res:Response)=>{

    try {
    res.status(200).json({
    msg:"logout successfully"
    })
    return
        
    } catch (e) {
    console.log(e);
    res.status(400).json({
    msg:"api error"
    })
    return        
    }

}