const express = require('express')
const Router = express.Router()
const bodyparser=require("body-parser")
//for json data
Router.use(bodyparser.json())
// load connection
const conn=require("../db_Connection")


  Router.post("/restuser/",(req,res)=>{
    console.log("hrllo")
   var sql="";
   var value=[req.body.mobileno,req.body.email,req.body.restname,req.body.restdesc,req.body.address,req.body.city,req.body.status]
   conn.query(sql,value, function (error, results) {
       if (error){ throw error;}
        else{
          
           
       }          
     });
  });

  Router.post("/enduser/",(req,res)=>{
    console.log("hrllo")
   var sql="select * from enduser where mobileno='"+req.body.mobileno+"' AND email='"+req.body.email+"'";
   conn.query(sql, function (error, results) {
       if (error){ throw error;}
        else{
            if(results[0]!=null)
            {console.log(results);
              var nodemailer = require('nodemailer');
              var transporter = nodemailer.createTransport({
              service:
              'gmail',
              auth: {
              user: "ramsky2021@gmail.com",
              pass: "ramsky@12345"
              }
              });
              var mailOptions = {
                  from: 'ramsky2021@gmail.com',
                  to: results[0].email,
                  subject: 'Sending Email using Node.js and old password'+results[0].password,
                  text: "Your password:"+results[0].password
                  };
                  transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                  console.log(error);
                  } else {
                  console.log('Email sent: ' + info.response);
                  return res.status(200).json({"status":true})
                  }
                  }); 
            }else{console.log("Not Found")}
       }          
     });
  });
  


  

module.exports=Router;
