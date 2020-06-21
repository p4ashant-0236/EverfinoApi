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

   
  Router.get("/liveorder_order/:id",(req,res)=>{
    console.log("hello request")
    conn.query("SELECT liveid, orderid, tableid,liveorders_"+req.params.id+".itemid,menu_"+req.params.id+".itemname,menu_"+req.params.id+".itemprice,userid, quntity, status, order_date FROM liveorders_"+req.params.id+",menu_"+req.params.id+" WHERE liveorders_"+req.params.id+".orderid="+req.query.orderid+" and liveorders_"+req.params.id+".itemid=menu_"+req.params.id+".itemid", function (error, results) {
      if (error) throw error;
      return res.status(200).json(results)
    });
   
   });



     Router.get("/liveorder_order/perUserOrder/:id",(req,res)=>{
     console.log("hello request")
     conn.query("SELECT liveid, orderid, tableid,liveorders_"+req.params.id+".itemid,menu_"+req.params.id+".itemname,menu_"+req.params.id+".itemprice,userid, quntity, status, order_date FROM liveorders_"+req.params.id+",menu_"+req.params.id+" WHERE liveorders_"+req.params.id+".itemid=menu_"+req.params.id+".itemid AND userid="+req.query.userid, function (error, results) {
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
  
//add new
///everfino/rest_table/add/:id
  Router.post("/add/:id",(req,res)=>{
    console.log(req.body.orderid+""+req.body.tableid+""+req.body.itemid+""+req.body.userid+""+req.body.quntity+""+req.body.status+"__________");
   var sql="INSERT INTO liveorders_"+req.params.id+"(orderid,tableid,itemid,userid,quntity,status,order_date) VALUES (?,?,?,?,?,?,?)";
   var value=[req.body.orderid,req.body.tableid,req.body.itemid,req.body.userid,req.body.quntity,req.body.status,new Date()];
   console.log(value);
   conn.query(sql,value,function (error, results) {
       if (error) throw error;
      
       return res.status(200).json({"liveid":results.insertId})
     });
  });
  

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
