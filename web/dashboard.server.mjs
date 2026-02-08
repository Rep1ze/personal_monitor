import express from "express"
const app = express()
const port = 3000

app.listen(port,()=>{
    try{
        console.log(`http://localhost:${port}`)
    }catch(e){
        console.log(e)
    }
})