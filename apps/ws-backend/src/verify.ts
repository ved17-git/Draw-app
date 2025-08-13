import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/backend-common/config'
import { Response } from 'express';
export const verifyToken=(token:string)=>{

    try {
        
    const decoded=jwt.verify(token, JWT_SECRET)

    if(typeof decoded==="string"){
        return null
    }
    const userId=decoded.userId
    return userId
        
    } catch (e) {
        console.log(e);
        return
    }

}