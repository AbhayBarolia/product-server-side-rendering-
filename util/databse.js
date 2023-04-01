const mySQL = require('mysql2');

const pool = mySQL.createPool({
    host:'localhost',
    user:'root',
    database:'node-practice',
    password:'Abhay@123'
});

module.exports=pool.promise();