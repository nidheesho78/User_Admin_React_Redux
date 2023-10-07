import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
dotenv.config()
import cookieParser from 'cookie-parser'

const port = process.env.PORT||5000
connectDB();
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
  
// ===================== Setting Static Folder =====================
app.use(express.static('backend/Public'));


app.use('/api/users',userRouter)
app.use('/api/admin',adminRouter)

app.get('/',(req,res)=>res.send('Server started'))

app.use(notFound) 
app.use(errorHandler)

app.listen(port,()=>console.log(`Server Started on Port ${port}`)) 