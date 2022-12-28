
const express=require("express");
const app=express();
const { Client } = require("pg")
var bodyParser = require('body-parser')
const productRoute = require("./routes/product");
const client=require("./connection")
const userRoute = require("./routes/user")




    app.listen(4000,()=>{
        console.log("server is running....");
    })
   

   app.use("/api/user",userRoute)
   app.use("/api/product",productRoute)
  

   
