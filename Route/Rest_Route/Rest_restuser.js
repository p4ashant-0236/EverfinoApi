const express = require('express')
const Router = express.Router()
const bodyparser=require("body-parser")
//for json data
Router.use(bodyparser.json())
// load connection
const conn=require("../../db_Connection")

///everfino/rest_user/:id       

  Router.get("/:id",(req,res)=>{
    conn.query('SELECT * from restuser_'+req.params.id, function (error, results) {
        if (error) throw error;
        return res.status(200).json(results)
      });
   
   });

//fetch 
///everfino/rest_user/:id and body have id
  Router.get('/single/:id',(req,res)=>{
  
    var sql="SELECT * FROM restuser_"+req.params.id+" WHERE userid=?";
   conn.query(sql,[req.query.userid],function (error, results) {
       if (error) throw error;
       console.log(results)
       return res.status(201).json(results[0])
     });
  
  });
  
//add new
///everfino/rest_user/add/:id
  Router.post("/add/:id",(req,res)=>{
      
   var sql="insert into restuser_"+req.params.id+"(name,password,email,mobileno,role) values(?,?,?,?,?)";
   var value=[req.body.name,req.body.password,req.body.email,req.body.mobileno,req.body.role]
   console.log(value);
   conn.query(sql,value,function (error, results, fields) {
       if (error) throw error;
       return res.status(200).json({"userid":results.insertId,"name":req.body.name})
     });
  });
  
//modify
///everfino/rest_user/modify/:id and body have id
//name,mobileno,email,password,role
  Router.put("/modify/:id",(req,res)=>{
    var sql="update restuser_"+req.params.id+" set name=?,password=?,email=?,mobileno=?,role=? where userid=?";
    var value=[req.body.name,req.body.password,req.body.email,req.body.mobileno,req.body.role,req.query.userid]
    conn.query(sql,value,function (error, results) {
       if (error) throw error;
       return res.status(200).json(results)
     });
  });
  
//datete 
///everfino/rest_user/:id and body have id
  Router.delete("/delete/:id",(req,res)=>{
  
    var sql="delete from restuser_"+req.params.id+" where userid=?";
   
   conn.query(sql,[req.query.userid],function (error, results) {
       if (error) throw error;
       return res.status(200).json(results)
     });
  });
  

module.exports=Router;
