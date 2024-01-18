//Loads .env file contents in to process.env by default.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')
//Create an express application
 const pfServer = express()

 pfServer.use(cors())
 //For parsing json data to js in express
 pfServer.use(express.json())
 pfServer.use(router)
 pfServer.use('/uploads',express.static('./uploads'))
 const PORT = 4000 || process.env.PORT

 pfServer.listen(PORT,()=>{
    console.log(`Project fair server started at ${PORT} and waiting for client request `);
 })
 //http request resolving to http://localhost:4000/

 pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project fair server started and Waiting for Client request!!!</h1>`)
 })

pfServer.post('/',(req,res)=>{
    res.send("Post request")
})