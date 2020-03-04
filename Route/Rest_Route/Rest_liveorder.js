const express = require('express')
const Router = express.Router()
const bodyparser=require("body-parser")
//for json data
Router.use(bodyparser.json())
// load connection
const conn=require("../../db_Connection")


  Router.get("/:id",(req,res)=>{
    conn.query("SELECT liveid, orderid, tableid,liveorders_"+req.params.id+".itemid,menu_"+req.params.id+".itemname,menu_"+req.params.id+".itemprice,userid, quntity, status, order_date FROM liveorders_"+req.params.id+",menu_"+req.params.id+" WHERE liveorders_"+req.params.id+".itemid=menu_"+req.params.id+".itemid", function (error, results) {
        if (error) throw error;
        return res.status(200).json(results)
      });
   
   });

//fetch 
///everfino/rest_table/:id and body have id
//   Router.get('/:id',(req,res)=>{
  
//     var sql="SELECT * FROM diningtable_"+req.params.id+" WHERE itemid=?";
//    conn.query(sql,[req.body.itemid],function (error, results) {
//        if (error) throw error;
//        return res.status(201).json(results)
//      });
  
//   });
  
// //add new
// ///everfino/rest_table/add/:id
//   Router.post("/add/:id",(req,res)=>{
//    var sql="insert into diningtable_"+req.params.id+"(tableno,status,tableqr) values(?,?,?)";
//    var value=[req.body.tableno,req.body.status,req.body.tableqr]
//    console.log(value);
//    conn.query(sql,value,function (error, results, fields) {
//        if (error) throw error;
//        return res.status(200).json({"tableid":results.insertId})
//      });
//   });
  

  Router.put("/modify_liveorderstatus/:id",(req,res)=>{
    var sql="update liveorders_"+req.params.id+" set status=? where liveid=?";
    var value=[req.query.status,req.query.liveid]
    
    conn.query(sql,value,function (error, results) {
        console.log(results)
       if (error) throw error;
       return res.status(200).json(results)
     });
  });
  
// //datete 
// ///everfino/rest_table/:id and body have id
//   Router.delete("/delete/:id",(req,res)=>{
  
//     var sql="delete from diningtable_"+req.params.id+" where tableid=?";
   
//    conn.query(sql,[req.query.tableid],function (error, results) {
//        if (error) throw error;
//        return res.status(200).json(results)
//      });
//   });
  

module.exports=Router;
