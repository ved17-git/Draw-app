import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/backend-common/config'
export const verifyToken=(token:string)=>{
       
    try {
         const decoded=jwt.verify(token, JWT_SECRET)

    if(typeof decoded==="string"){
        return null
    }

    if(!decoded || !decoded.userId){
        return null
    }
    const userId=decoded.userId
    return userId
        
    } 
    catch (e) {
        console.log(e);
    }
        
}