// async errors
require('dotenv').config()
require('express-async-errors')

//import express
const express=require('express');
//instatize express using app
const app=express();
const cors=require('cors');
//
const connectDB=require("./db/connect")

const productsRouter=require('./routes/products')

const notFoundMiddleware=require('./middleware/not-found');
const errorMiddleware=require('./middleware/error-handler');

//middleware
app.use(express.json());

//cors support
app.use(cors());
//routes

app.get("/",(req,res)=>{
  res.send('<h1>Store API</h1><a href="/api/v1/products"> products routes</a>')
})

app.use("/api/v1/products",productsRouter)

//products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port=process.env.PORT || 3000;

const start=async()=>{
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log('Server is listening oon 3000'))
  }
  catch(err){
    console.log(err);
  }
}
start();