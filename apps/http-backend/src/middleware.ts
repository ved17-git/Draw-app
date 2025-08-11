import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { NewRequest } from './globalTypes'
import { JWT_SECRET } from '@repo/backend-common/config'

export const middleware=(req:NewRequest,res:Response,next:NextFunction)=>{

 const authHeader=req.headers.authorization

 if(!authHeader || !authHeader.startsWith('Bearer ')){
    res.status(200).json({
        msg:"auth header not found"
    })
    return
 }
 const token=authHeader.split(' ')[1];



 try {

     if(!token){
    res.status(200).json({
    msg:"token not found"
    })
    return
 }

 const decoded=jwt.verify(token, JWT_SECRET as string)

if (decoded && typeof decoded !== "string") {
  (req as NewRequest).userId = decoded.userId as string;
  next();
}
    
 } catch (e) {
    console.log(e);
    res.status(200).json({
    msg:"middleware error"
    })
    return
    
 }



}