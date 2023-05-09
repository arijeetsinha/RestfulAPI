//jshint esversion:6
const express = require('express')

require('dotenv').config();

const mongoose = require('mongoose')
const Product = require('./models/Productmodel')
const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.get('/',(req, res) => {
    res.send('Hello Node')
})

app.get('/blog',(req, res) => {
    res.send("Hello Blog")
})

app.get('/products', async(req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}) 

app.get('/products/:id', async(req, res) => {
    try{
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}) 

app.post('/products', async(req, res) => {
    try{
        const products = await Product.create(req.body)
        res.status(200).json(products)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}) 

//update a product
app.put('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIDAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }
        const updatedProduct = await Product.findByID(id);
        res.status(200).json(product)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}) 

//delete a product
app.delete('/products/:id', async(req, res) => {
    try{
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: 'cannot find any product with ${id}'})
        }
        res.status(200).json(product)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}) 

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('connected to mongo db');
    app.listen(3000, ()=>{
        console.log("Node API app is running on port 3000")
    });
}).catch((error) => {
    console.log(error)
})