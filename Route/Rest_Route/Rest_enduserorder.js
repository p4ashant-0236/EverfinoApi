const express = require('express')
const Router = express.Router()
const bodyparser=require("body-parser")

Router.use(bodyparser.json())

const conn=require("../../db_Connection")

Router.get("/:id",(req,res)=>{
console.log(req.params.id)
  conn.query("SELECT * FROM enduserorder_"+req.params.id+" WHERE 1 ORDER BY orderid ASC", function (error, results) 
  { var obj=[];
    var i=0;
    if(Array.isArray(results))
    {
    results.forEach(element=>{
     
      conn.query("SELECT * from orders_"+element.restid+" WHERE orderid="+element.orderid, function(error,results){obj[i]= results[0];i++});
    
    }); }
   
    setTimeout(()=>{console.log(obj);
      const r=Array.from(new Set(obj.map(JSON.stringify))).map(JSON.parse);
      return res.status(200).json(r)},3000);
              
});




  Router.get("/moreuserorder/:id",(req,res)=>{
      var obj=[];
      var i=0;
    conn.query("SELECT * FROM enduserorder_"+req.params.id+" WHERE orderid="+req.query.orderid+" ORDER BY orderid ASC", function (error, results) 
    {
        if (error){}
        results.forEach(element => {
          var o=new Object();
           
             conn.query("SELECT * FROM menu_"+element.restid+" WHERE itemid="+element.itemid,function(error,results){o.Menu=results[0]
              
                conn.query("SELECT * FROM restaurant WHERE restid="+element.restid,function(error,results){o.Restaurant=results[0]
                  obj[i]=o;
                  console.log(o);
                  i++;
                });
           
              });
           
            });
           
          
          
        });

        setTimeout(()=>{console.log(obj);
        return res.status(200).json(obj)},3000);
        

        
        
        
        
    });
       
        
      });
   
  
   
 



  

module.exports=Router;
