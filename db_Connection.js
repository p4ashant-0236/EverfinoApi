var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : '192.168.0.104',
  port:'3306',
  user     : 'root',
  password : '',
  database : 'everfinodb',
  multipleStatements: true
});

conn.connect();


module.exports=conn;