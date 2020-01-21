const express = require('express')
const Router = express.Router()

// load connection
const conn=require("./db_Connection")

//create all tables
  Router.get('/',(req,res)=>{
    
    var admin="create table if not exists admin(adminid int primary key auto_increment,username varchar(20) not null,password varchar(20) not null,mobileno varchar(10),email varchar(50) not null);";
    var enduser="create table if not exists enduser(userid int primary key auto_increment,name varchar(50),password varchar(20) not null,mobileno varchar(10),email varchar(50) not null,dob date,gender varchar(5),status varchar(10));"
    var rest="create table if not exists restaurant(restid int primary key auto_increment,mobileno varchar(10),email varchar(50),restname varchar(30),restdesc varchar(100),address varchar(100),city varchar(20),status varchar(15));"; 
    conn.query(admin+enduser+rest,function (error, results) {
       if (error) throw error;
       return res.status(201).json(results)
    });
  
  });

  module.exports=Router