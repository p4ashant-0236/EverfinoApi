const express = require('express')
const Router = express.Router()
const bodyparser=require("body-parser")
//for json data
Router.use(bodyparser.json())
// load connection
const conn=require("../db_Connection")

//fatch one
//restaurant/
  Router.get("/",(req,res)=>{
    conn.query('SELECT * from restaurant', function (error, results) {
        if (error) throw error;
        return res.status(200).json(results)
      });
   
   });

//fetch all
//restaurant/:id
  Router.get('/:id',(req,res)=>{
  
    var sql="SELECT * FROM restaurant WHERE restid=?";
   conn.query(sql,[req.params.id],function (error, results) {
       if (error) throw error;
       return res.status(201).json(results)
     });
  
  });
  
//add new
//restaurant/add
//restaurant(restid,mobileno,email,restname,restdesc,address,city ) 
   
  Router.post("/add",(req,res)=>{
   var sql="insert into restaurant(mobileno,email,restname,restdesc,address,city,status) values(?,?,?,?,?,?,?)";
   var value=[req.body.mobileno,req.body.email,req.body.restname,req.body.restdesc,req.body.address,req.body.city,req.body.status]
   conn.query(sql,value,function (error, results) {
       if (error){ throw error;}
       else{
          
            var restuser="create table restuser_"+results.insertId+"(userid int primary key auto_increment,name varchar(40),password varchar(20) not null,email varchar(50) not null,mobileno varchar(10),role varchar(10);";
            var menu="create table menu_"+results.insertId+"(itemid int primary key auto_increment,itemname varchar(40),itemprice int not null,itemdesc varchar(100),itemtype varchar(20));";
            var diningtable="create table diningtable_"+results.insertId+"(tableid int primary key auto_increment,tableno int,status varchar(10),tableqr varchar(10));";
            var orders="create table orders_"+results.insertId+"(orderid int primary key auto_increment,userid int,amount int,paymentstatus varchar(10),order_date date,foreign key(userid) references enduser(userid));";
            var orderitem="create table orderitem_"+results.insertId+"(orderid int,itemid int,quntity int,remark varchar(50),foreign key(orderid) references orders_"+results.insertId+"(orderid),foreign key(itemid) references menu_"+results.insertId+"(itemid));";
            var reservation="create table reservation_"+results.insertId+"(reservationid int primary key auto_increment,tableid int,userid int,reserve_date date,foreign key(tableid) references diningtable_"+results.insertId+"(tableid),foreign key(userid) references enduser(userid));";
            var liveorder="create table liveorders_"+results.insertId+"(liveid int primary key auto_increment,orderid int,tableid int,itemid int,userid int,quntity int,status varchar(10),order_date date,foreign key(orderid) references orders_"+results.insertId+"(orderid),foreign key(tableid) references diningtable_"+results.insertId+"(tableid),foreign key(itemid) references menu_"+results.insertId+"(itemid),foreign key(userid) references enduser(userid));";
            var feedback="create table feedback_"+results.insertId+"(userid int,star int,fbdesc varchar(100),fbdate date,foreign key(userid) references enduser(userid));";
            conn.query(restuser+menu+diningtable+orders+orderitem+reservation+liveorder+feedback,(error,r)=>{if(error)throw error;
                return res.status(200).json({"userid":results.insertId})})
           
       }      
     });
  });
  
//modify
//restaurant/modify/:id
//restaurant(restid,mobileno,email,restname,restdesc,address,city ) 
  Router.put("/modify/:id",(req,res)=>{
    var sql="update restaurant set mobileno=?,email=?,restname=?,restdesc=?,address=?,city=?,status=? where restid=?";
    var value=[req.body.mobileno,req.body.email,req.body.restname,req.body.restdesc,req.body.address,req.body.city,req.params.id,req.body.status]
    conn.query(sql,value,function (error, results) {
       if (error) throw error;
       return res.status(200).json(results)
     });
  });
  
//datete 
//restaurant/delete/:id
//restaurant(restid,mobileno,email,restname,restdesc,address,city ) 
  Router.delete("/delete/:id",(req,res)=>{
  
    var sql="update restaurant set status='deactivate' where restid=?";
   
   conn.query(sql,[req.params.id],function (error, results) {
       if (error) {throw error;}
       /*else{
         var id=req.params.id
         var restuser="drop table restuser_"+id+";";
         var feedback="drop table feedback_"+id+";";
         var orderitem="drop table orderitem_"+id+";";
         var liveorders="drop table liveorders_"+id+";";
         var diningtable="drop table diningtable_"+id+";";
         var orders="drop table orders_"+id+";";
         var reservation="drop table reservation_"+id+";";
         var menu="drop table menu_"+id+";";
     
        
         
         conn.query(menu,(error,r)=>{return res.status(200).json(results)})
        
       }*/
       return res.status(200).json(results)
     });
  });
  

module.exports=Router;