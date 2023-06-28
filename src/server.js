const express = require("express");
const bodyParser = require("body-parser");
const { findAll, addOne, findOne, updateOne, deleteOne } = require("./database/frutas.manager");
require("dotenv").config();
const server = express();
server.use(express.json());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.get("/frutas/", (req, res) => {
  findAll()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err.message));
});
server.get("/frutas/:id", (req, res) => {
  const { id } = req.params;

  findOne(id)
    .then((data) =>{
     
        res.status(200).send(data)})
    .catch((err) => res.status(400).send(err.message));
});

server.post("/frutas/", (req, res) => {
  const { nombre, importe, stock} = req.body;
  const newFruit = { nombre, importe, stock,imagen: "🍐" };
  addOne(newFruit)
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err.message));
  
});
server.put("/frutas/:id", (req, res) => {
  const { nombre, importe, stock } = req.body;
 
  const{ id }= req.params
  const fruitUpdate = { nombre, importe, stock, imagen: "🍐" };
  updateOne(fruitUpdate,Number(id))
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err.message));
  
});
server.delete("/frutas/:id", (req, res) => {
 
  const{ id }= req.params
 
  deleteOne(Number(id))
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err.message));
  
});
server.use("*", (req, res) => {
  res.status(404).send("Not Found");
});


server.listen(process.env.PORT, process.env.HOST, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
