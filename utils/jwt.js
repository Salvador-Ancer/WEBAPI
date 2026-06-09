import jwt from 'jsonwebtoken';
import { Router } from 'express';

export const validateJWT = Router();
const JWT_SECRET = process.env.JWT ?? process.env.JWT_SECRET;

validateJWT.use((req,res,next)=>{

    if(!JWT_SECRET){
        res.status(500).json({msg:"JWT no configurado"})
        return
    }

    let token = req.headers.authorization
    if(!token){

        res.status(401).json({msg:"Se necesita un token"})
        return
    }
    if(token.toLowerCase().startsWith("bearer ")){
        
        token = token.split(" ")[1]
    }
    jwt.verify(token,JWT_SECRET,(e,decoded)=>{

        if(e){

            res.status(401).json({msg:e.message})

        }else{
            req.decoded = decoded
            next()

        }
    })
})