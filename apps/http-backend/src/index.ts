import express from 'express'

const app=express();

const port=8000
app.get("/", (req,res)=>{
    res.json({
        msg:"dawg"
    })
})

app.listen(port,()=>{
    console.log(`listening on ${port}`);  
})