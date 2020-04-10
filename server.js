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

const rest_menu=require('./Route/Rest_Route/Route_menu');
app.use('/everfino/rest_menu',rest_menu);

const rest_table=require('./Route/Rest_Route/Rest_Table');
app.use('/everfino/rest_table',rest_table);

const Rest_liveorder=require('./Route/Rest_Route/Rest_liveorder');
app.use('/everfino/rest_liveorder',Rest_liveorder);

const rest_Order=require('./Route/Rest_Route/Rest_Order');
app.use('/everfino/rest_Order',rest_Order);

const rest_enduserorder=require('./Route/Rest_Route/Rest_enduserorder');
app.use('/everfino/rest_enduserorder',rest_enduserorder);

const rest_user=require('./Route/Rest_Route/Rest_restuser');
app.use('/everfino/rest_user',rest_user);

const login=require('./Route/Route_login');
app.use('/everfino',login);
app.get("/",(req,res)=>{return res.status(201).json({"done":"success"})});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));