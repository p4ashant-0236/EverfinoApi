const express = require('express')
const Router = express.Router()
const bodyparser=require("body-parser")
//for json data
Router.use(bodyparser.json())
// load connection
const conn=require("../../db_Connection")


  Router.get("/:id",(req,res)=>{
    conn.query("SELECT orderid,enduser.userid,enduser.email,enduser.name,amount,paymentstatus,order_date FROM orders_"+req.params.id+",enduser WHERE orders_"+req.params.id+".orderid=1 AND orders_"+req.params.id+".userid=enduser.userid", function (error, results) {
        if (error) throw error;
        return res.status(200).json(results)
      });
   
   });

   
  Router.get("/single_order/:id",(req,res)=>{
    console.log("hello request")
    conn.query("SELECT orderid,enduser.userid,enduser.email,enduser.name,amount,paymentstatus,order_date FROM orders_"+req.params.id+",enduser WHERE orders_"+req.params.id+".orderid=1 AND orders_"+req.params.id+".userid=enduser.userid AND orders_"+req.params.id+".orderid="+req.query.orderid, function (error, results) {
        if (error) throw error;
        return res.status(200).json(results[0])
      });
   
   });

    Router.get("/single_order/orderitems/:id",(req,res)=>{
   
    conn.query("SELECT orderid,menu_"+req.params.id+".itemid,menu_"+req.params.id+".itemname,menu_"+req.params.id+".itemprice,quntity,remark FROM orderitem_"+req.params.id+",menu_"+req.params.id+" WHERE orderitem_"+req.params.id+".itemid=menu_"+req.params.id+".itemid AND orderitem_"+req.params.id+".orderid="+req.query.orderid, function (error, results) {
        if (error) throw error;
        console.log(results);
        return res.status(200).json(results)
      });
   
   });


   
  Router.put("/modify/:id",(req,res)=>{
    var sql="update orders_"+req.params.id+" set amount=?,paymentstatus=?,order_date=? where orderid=?";
    var value=[req.body.amount,req.body.paymentstatus,req.body.order_date,req.query.orderid]
    
    conn.query(sql,value,function (error, results) {
        console.log(results)
       if (error){ throw error;}
                  conn.query("select * from liveorders_"+req.params.id+" where orderid="+req.query.orderid,function(error,results){
                    if(error){throw error;}
                    console.log(results);
                  
                      results.forEach(element => {
                        conn.query("insert into enduserorder_"+element.userid+"(orderid,itemid,quntity,restid) values(?,?,?,?)",[element.orderid,element.itemid,element.quntity,req.params.id],function(error,results){if(error){throw error;}});
                             
                              conn.query("insert into orderitem_"+req.params.id+"(orderid,itemid,quntity) values(?,?,?)",[element.orderid,element.itemid,element.quntity],function(error,results){if(error){throw error;}
                              conn.query("delete from liveorders_"+req.params.id+" where liveid="+element.liveid,function(error,results){if(error) throw error;});
                                });
                      });
                   
                
                   });
       return res.status(200).json(results)
     });
  });

  

module.exports=Router;
