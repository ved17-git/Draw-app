import { Request, Response } from "express"
import jwt from 'jsonwebtoken'

export const signUp=(req:Request,res:Response)=>{

const {username, email, password}=req.body


try {
  
    //existing email




//create new user

    
} 
catch (e) {
    console.log(e);
    res.status(400).json({
    msg:"api error"
    })
    
}

}






export const login=(req:Request,res:Response)=>{

const {email, password}=req.body

try {
  
    //existing email


    //check passoword


const token=jwt.sign({userId:"123"}, process.env.JWT_SECRET as string)
res.status(200).json({
    token
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