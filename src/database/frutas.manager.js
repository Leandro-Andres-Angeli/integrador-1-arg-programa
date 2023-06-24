const fs = require("fs")
const path = require("path")
const route = path.join(__dirname,"frutas.json")
const read = async()=>{
        return new Promise((resolve,rej)=>{
            fs.readFile(route,"utf-8",(err,res)=>{
                if(err) rej(new Error ("Error leyendo archivo"))
                resolve(JSON.parse(res))
            })
        })
}
const write = async(content)=>{
        return new Promise((resolve,rej)=>{
            fs.writeFile(route,JSON.stringify(content,null,"\n"),"utf-8",(err,res)=>{
                if(err) rej(new Error ("Error escribiendo archivo"))
                resolve(true)
            })
        })
}
const findAll =async ()=>{
    const fruits = await read()

    return fruits
}
const addOne = async (fruit)=>{
    const fruits = await read()
    console.log(fruits)
    // fruit.importe&= +fruit.importe
    // fruit.precio&= +fruit.precio
    +fruit.importe
    +fruit.precio
    const newFruit = {id:fruits.length+1,...fruit}
    fruits.push(newFruit)
    await write(fruits)
    return newFruit 
}
module.exports = {findAll, addOne}