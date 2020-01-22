const express = require('express')
const Router = express.Router()
const bodyparser=require("body-parser")
//for json data
Router.use(bodyparser.json())
// load connection
const conn=require("../db_Connection")

//fatch one
//restaurant/
    Router.post("/enduser_login",(req,res)=>{
    conn.query('SELECT * from enduser where (email=? or mobileno=?) and password=? ',[req.body.username,req.body.username,req.password], function (error, results) {
        if (error){return res.status(200).json({"status":error})};
       
        if(results.length<=0){return res.status(200).json({"status":"false"})}
        return res.status(200).json(results)
      });
   
   });

   Router.post("/admin_login",(req,res)=>{
     console.log(req.body.username+req.body.password);
     conn.query('SELECT * from admin where (email=? or mobileno=?akash) and password=? ',[req.body.username,req.body.username,req.password], function (error, results) {
      if (error){return res.status(200).json({"status":error})};
        
        if(Array.isArray(results) && results.length){return res.status(200).json({"status":"false"})}
        return res.status(200).json(results)
      });
   
   });




module.exports=Router;
