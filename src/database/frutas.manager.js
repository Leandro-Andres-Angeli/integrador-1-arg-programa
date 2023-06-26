const fs = require("fs");
const path = require("path");
const route = path.join(__dirname, "frutas.json");
const read = async () => {
  return new Promise((resolve, rej) => {
    fs.readFile(route, "utf-8", (err, res) => {
      if (err) rej(new Error("Error leyendo archivo"));
      resolve(JSON.parse(res));
    });
  });
};
const write = async (content) => {
  return new Promise((resolve, rej) => {
    fs.writeFile(
      route,
      JSON.stringify(content, null, "\n"),
      "utf-8",
      (err, res) => {
        if (err) rej(new Error("Error escribiendo archivo"));
        resolve(true);
      }
    );
  });
};
const findAll = async () => {
  const fruits = await read();

  return fruits;
};
const addOne = async (fruit) => {
  const fruits =await read()
     fruit.importe&= +fruit.importe
    
     fruit.stock&= +fruit.stock
  
  const newFruit = { id: fruits.length + 1, ...fruit };
  fruits.push(newFruit);
  await write(fruits);
  return newFruit;
};
const updateOne = async (fruitUpdate,id) => {
  const {nombre,importe,stock} = fruitUpdate
  if(!nombre || !importe  || !stock){
    throw new Error("Datos incompletos")
  }
  if(!id){
    throw  new Error("No se encontro fruta con ese Id")
  }
  const fruits =await read()
     fruitUpdate.importe&= +fruitUpdate.importe
     fruitUpdate.precio&= +fruitUpdate.precio
     fruitUpdate.stock&= +fruitUpdate.stock
  
  if(id < 0 ){
    throw new Error("Id no existente")
  }
  if( fruits.find((fruit) => fruit.id === id) === undefined ){
    throw new Error("Id no existente") 
  }
  const fruitPos = fruits.findIndex((fruit)=> fruit.index === id)
  fruits[fruitPos] ={id, ...fruitUpdate}
  await write(fruits);
  return fruits[fruitPos];
};
const findOne = async (id) => {
  if(id < 0 ){
    throw new Error("Id no existente")
  }
  const fruits = await read();
  
  const fruit = fruits.find((fruit) =>{
   
    return fruit.id === +id});
 if(!fruit){
  throw new Error("No se encontro fruta")
 }
  return fruit;
};
const findByName = async (name) => {
  if(!name ){
    throw new Error("Ingrese nombre")
  }
  console.log(name)
  const fruits = await read();
  
  const fruit = fruits.filter((fruit) =>

  fruit.nombre.toLowerCase().includes(name.toLowerCase())

    );
 if(fruit.length === 0){
  throw new Error("No se encontraron  frutas")
 }
  return fruit;
};
const deleteOne = async (id) => {
  if(!id){
    throw new Error("No se encontro Id")
   }
  const fruits = await read();
  const idx = fruits.findIndex((el)=> el.id === id)
  const fruit = fruits[idx]
  if(!fruit){
    throw new Error("No se encontro fruta con ese id")
  }
  fruits.splice(idx,1)
  await write(fruits)
  return fruit
 

};
module.exports = { findAll,findByName, addOne, findOne,updateOne,deleteOne };
