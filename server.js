const express = require('express')
const app = express()
const port = 3000


const create_db_schema=require('./create_db_schema');
app.use('/everfino/create_db_schema',create_db_schema);

const admin=require('./Route/Route_admin');
app.use('/everfino/admin',admin);

const enduser=require('./Route/Route_enduser');
app.use('/everfino/enduser',enduser);

const rest=require('./Route/Route_rest');
app.use('/everfino/rest',rest);

const login=require('./Route/Route_login');
app.use('/everfino',login);
app.get("/",(req,res)=>{return res.status(201).json({"done":"success"})});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));