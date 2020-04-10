const express = require('express')
const Router = express.Router()
const bodyparser=require("body-parser")
//for json data
Router.use(bodyparser.json())
// load connection
const conn=require("../db_Connection")

//fatch one
//User/
  Router.get("/",(req,res)=>{
    conn.query('SELECT * from enduser', function (error, results) {
        if (error) throw error;
        return res.status(200).json(results)
      });
   
   });

//fetch all
//User/:id
  Router.get('/:id',(req,res)=>{
  
    var sql="SELECT * FROM enduser WHERE userid=?";
   conn.query(sql,[req.params.id],function (error, results) {
       if (error) throw error;
       return res.status(201).json(results)
     });
  cd
  });
  
//add new
//User/add
//userid ,name ,password,mobileno ,email ,dob,gender
  Router.post("/add",(req,res)=>{
   var sql="insert into enduser(name,password,mobileno,email,dob,gender,status) values(?,?,?,?,?,?,?)";
   var value=[req.body.name,req.body.password,req.body.mobileno,req.body.email,req.body.dob,req.body.gender,req.body.status]
   console.log(value);
   conn.query(sql,value,function (error, results, fields) {
       if (error){return res.status(200).json({"userid":0})};
       var enduserorder="create table if not exists enduserorder_"+results.insertId+"(orderid int,itemid int,quntity int,restid int)";
       conn.query(enduserorder,(error,r)=>{if(error)throw error});
       return res.status(200).json({"userid":results.insertId})
     });
  });
  
//modify
//User/modify/:id
  Router.put("/modify/:id",(req,res)=>{
    var sql="update enduser set name=?,password=?,mobileno=?,email=?,dob=?,gender=?,status=? where userid=?";
    var value=[req.body.name,req.body.password,req.body.mobileno,req.body.email,req.body.dob,req.body.gender,req.body.status,req.params.id]
    conn.query(sql,value,function (error, results) {
       if (error) throw error;
       return res.status(200).json(results)
     });
  });
  
//datete 
//User/delete/:id
  Router.delete("/delete/:id",(req,res)=>{
  
    var sql="update enduser set status='deactivate' where userid=?";
   
   conn.query(sql,[req.params.id],function (error, results) {
       if (error) throw error;
       return res.status(200).json(results)
     });
  });
  

module.exports=Router;
