const express = require('express')
const Router = express.Router()
const bodyparser=require("body-parser")
//for json data
Router.use(bodyparser.json())
// load connection
const conn=require("../db_Connection")

//fatch one
//admin/
  Router.get("/",(req,res)=>{
    conn.query('SELECT * from admin', function (error, results) {
        if (error) throw error;
        return res.status(200).json(results)
      });
   
   });

//fetch all
//admin/:id
  Router.get('/:id',(req,res)=>{
  
    var sql="SELECT * FROM admin WHERE adminid=?";
   conn.query(sql,[req.params.id],function (error, results) {
       if (error) throw error;
       return res.status(201).json(results[0])
     });
  
  });
  

  
//modify
//admin/modify/:id
//adminid ,username,password,mobileno,email
  Router.put("/modify/:id",(req,res)=>{
    var sql="update admin set password=?,mobileno=?,email=? where adminid=?";
    var value=[req.body.password,req.body.mobileno,req.body.email,req.params.id]
    conn.query(sql,value,function (error, results) {
       if (error) throw error;
       return res.status(200).json(results)
     });
  });
  

  

module.exports=Router;
