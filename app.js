import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.get('/', (req, res)=>{
    res.send("Hello from Server")
})

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})