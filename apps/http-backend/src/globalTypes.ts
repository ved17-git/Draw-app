import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface NewRequest extends Request{
    userId?:string | JwtPayload
}