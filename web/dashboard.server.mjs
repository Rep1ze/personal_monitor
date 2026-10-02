import express from "express"
const __dirname = dirname(fileURLToPath(import.meta.url));
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routerAPI, routerServices } from "./routes/routes.mjs";
import dotenv from "dotenv"
const app = express()
const port = 3000
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api",routerAPI,(express.static(__dirname + "/public")))
app.use("/services",routerServices)




app.listen(port,()=>{
    try{
        console.log(`http://localhost:${port}`)
    }catch(e){
        console.log(e)
    }
})