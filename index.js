import "dotenv/config"
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from "./routes/index.routes.js"
import loginRoutes from "./routes/login.routes.js"
import usersRoutes from "./routes/users.routes.js"
import { connectDB } from './utils/db.js';

connectDB()

const app = express();

app.use(cors());
app.use(express.json())
app.use(morgan("dev"))
app.use(indexRoutes)
app.use(loginRoutes)
app.use(usersRoutes)
/*
app.get("/",(req,res)=>{res.send("Hola mundo desde la API")})
app.get("/ping",(req,res)=>{res.send("pong")})
app.get("/a/b/c",(req,res)=>{res.send("ABC")})
*/
const PORT = process.env.PORT || 8000;

app.listen(PORT,console.log("http://localhost:"+PORT))
