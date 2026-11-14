import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import router from './routes/billing.route.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("/",router)
app.get('/',(req,res)=>{
    res.json({message: "Hello from Billing server!"})
})

app.listen(PORT,()=>{
    console.log(`Billing started at Port ${PORT}`)
    connectDB()
})