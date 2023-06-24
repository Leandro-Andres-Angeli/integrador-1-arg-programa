
const express = require("express")
const bodyParser = require("body-parser")
const { findAll, addOne } = require("./database/frutas.manager")
require("dotenv").config()
const server = express()
server.use(express.json())
server.use(bodyParser.json())
server.use(express.urlencoded({extended:true}))
server.get("/",(req,res)=>{
    findAll().then((data)=>res.status(200).send(data)).catch(err => res.status(400).send(err.message))
})
server.post("/",(req,res)=>{
    const {nombre , importe   , stock} = req.body
    const newFruit = {nombre,importe,stock,imagen:"🍐"}
    addOne(newFruit).then(data => res.status(201).send(data) ).catch(err => res.status(400).send(err.message))
    // res.status(200).send(newFruit)
})
server.use("*",(req,res)=>{
    res.status(404).send("Not Found")
})

server.listen(process.env.PORT,process.env.HOST , ()=> console.log(`Running on port ${process.env.PORT}`))