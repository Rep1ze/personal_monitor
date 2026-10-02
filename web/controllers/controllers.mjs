
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from "node:path";
import db from '../../db/db.mjs';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { message } from 'telegraf/filters';
const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_PATH = path.join(__dirname, "../","/public")

const error_handler = (res,filename)=>{
    try{
        res.sendFile(PUBLIC_PATH + filename)
    }catch(e){
        console.log(e)
    }
}
const findUser = (email) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        })
    })
}

export const registerGet = (req,res)=>{
    error_handler(res,"/register.html")
}
export const registerPost = async (req,res)=>{
      try{
        console.log(`Данные:`, req.body)
        const {email,password,username} = req.body
        if(!email || !password || !username){
            return res.status(400).json({
                message: "заполните данные",
                success:false
            })
        }
        const exUser = await findUser(email)
        if(exUser){
            return res.status(400).json({ message:"пользователь уже существует",success:false})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
            await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
                [email, hashedPassword, username],
                function(err) {
                    if (err) reject(err);
                    else resolve(this);
                }
            )
        })
        res.status(201).json({
        data: {email,username},
        message: `Регистрация прошла успешно`,
        success:true
        })
        
        }
        
    catch(e){
        console.log(e)
        res.status(500).json({message: "Internal Server Error",success:false})
        
    }
}
export const loginGet = (req,res)=>{
    error_handler(res,"/login.html")
}
export const loginPost = async (req,res)=>{
        try{
        const {email,password} = req.body
        console.log("Попытка входа")
        if(!email || !password){
           return res.status(400).json({ message:"Неверный email или пароль",success:false})
        }
          const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) reject(err)
                else resolve(row)
            })
        })
        if(!user){
           return res.status(401).json({
            message: "Неверный email или пароль",
            success:false
           })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ 
                success: false,
                message: "Неверный email или пароль" 
            })
        }
          const token = jwt.sign({id : user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.json(token)
         res.status(200).json({
            message:"login in",
            token:token,
            data: {
                id: user.id,
                email:user.email,
                username:user.username,
                success:true
            }
         })
    }catch(e){
        console.log(e)
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }    
}
export const homeGet = (req,res)=>{
   error_handler(res,"/home.html")
}
export const homePost = (req,res)=>{
    try{
        res.json({
            message:"post work"
        })
    }catch(e){
        console.log(e)
    }
}
export const servicesDashBoardPost = (req,res)=>{
    try{
        res.json({
            message:"Dashboard"
        })
    }catch(e){
        console.log(e)
        res.send(404)
    }
}
export const servicesPostgresPost = (req,res)=>{
    try{
        res.json({
            message:"Postgres"
        })
    }catch(e){
        console.log(e)
        res.send(404)
    }
}
export const servicesRedisPost = (req,res)=>{
    try{
        res.json({
            message:"Redis cache"
        })
    }catch(e){
        console.log(e)
        res.send(404)
    }
}
export const serviceYoutubePost = (req,res)=>{
    try{
        res.json({
            message:"Youtube"
        })
    }catch(e){
        console.log(e)
        res.send(404)
    }
}