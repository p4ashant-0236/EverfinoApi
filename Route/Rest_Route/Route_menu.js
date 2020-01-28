const express = require('express')
const Router = express.Router()
const bodyparser=require("body-parser")
//for json data
Router.use(bodyparser.json())
// load connection
const conn=require("../../db_Connection")

///everfino/rest_menu/:id       
  Router.get("/:id",(req,res)=>{
    conn.query('SELECT * from menu_'+req.params.id, function (error, results) {
        if (error) throw error;
        return res.status(200).json(results)
      });
   
   });

//fetch 
///everfino/rest_menu/:id and body have id
  Router.get('/:id',(req,res)=>{
  
    var sql="SELECT * FROM menu_"+req.params.id+" WHERE itemid=?";
   conn.query(sql,[req.body.itemid],function (error, results) {
       if (error) throw error;
       return res.status(201).json(results)
     });
  
  });
  
//add new
///everfino/rest_menu/add/:id
//itemid,itemname ,itemprice ,itemdesc ,itemtype
  Router.post("/add/:id",(req,res)=>{
   var sql="insert into menu_"+req.params.id+"(itemname,itemprice,itemdesc,itemtype) values(?,?,?,?)";
   var value=[req.body.itemname,req.body.itemprice,req.body.itemdesc,req.body.itemtype]
   conn.query(sql,value,function (error, results, fields) {
       if (error) throw error;
       return res.status(200).json({"userid":results.insertId})
     });
  });
  
//modify
///everfino/rest_menu/modify/:id and body have id
  Router.put("/modify/:id",(req,res)=>{
    var sql="update menu_"+req.params.id+" set itemname=?,itemprice=?,itemdesc=?,itemtype=? where userid=?";
    var value=[req.body.itemname,req.body.itemprice,req.body.itemdesc,req.body.itemtype,req.body.itemid]
    conn.query(sql,value,function (error, results) {
       if (error) throw error;
       return res.status(200).json(results)
     });
  });
  
//datete 
///everfino/rest_menu/:id and body have id
  Router.delete("/delete/:id",(req,res)=>{
  
    var sql="delete from menu_"+req.params.id+" where itemid=?";
   
   conn.query(sql,[req.body.itemid],function (error, results) {
       if (error) throw error;
       return res.status(200).json(results)
     });
  });
  

module.exports=Router;
