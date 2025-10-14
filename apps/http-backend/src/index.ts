import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/userRoutes';
import {roomRouter} from './routes/roomRouter'


// require('dotenv').config()


const app=express();
app.use(express.json())
app.use(cors())


const port=8000

app.use('/', userRouter)
app.use('/', roomRouter)

app.get("/", (req,res)=>{
    res.json({
        msg:"testing  / route"
    })
})

app.listen(port,()=>{
    console.log(`listening on ${port}`);  
})