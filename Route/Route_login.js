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
    conn.query('SELECT * from enduser where (email=? or mobileno=?) and password=? ',[req.body.username,req.body.username,req.body.password], function (error, results) {
      if (error){return res.status(200).json({"status":error})};
        
      if(Array.isArray(results) && results.length){results[0].status=true;return res.status(200).json(results)}
      return res.status(200).json({"status":false})
      
    });
 
   });

   Router.post("/admin_login",(req,res)=>{
     console.log(req.body.username+req.body.password);
     conn.query('SELECT * from admin where (email=? or mobileno=?) and password=? ',[req.body.username,req.body.username,req.body.password], function (error, results) {
      if (error){return res.status(200).json({"status":error})};
        
      if(Array.isArray(results) && results.length){results[0].status=true;return res.status(200).json(results[0])}
      else{console.log(results);return res.status(200).json({"status":false})}
      
      
      })
   
   });


//everfino/rest_staff_login/:id
   Router.post("/rest_staff_login/:id",(req,res)=>{
    console.log(req.body.username+req.body.password);
    conn.query('SELECT * from restuser_'+req.params.id+' where (email=? or mobileno=?) and password=? ',[req.body.username,req.body.username,req.body.password], function (error, results) {
     if (error){return res.status(200).json({"name":"false"})};
       
     if(Array.isArray(results) && results.length){results[0].status=true;return res.status(200).json(results[0])}
     else{console.log(results);return res.status(200).json({"name":"false"})}
     
     
     });
    });




module.exports=Router;
