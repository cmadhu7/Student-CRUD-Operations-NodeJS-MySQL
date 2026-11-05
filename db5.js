/* db5.js
(e) Write a program to establish the connection between 
API and Database using Express – MySQL Driver

Install MySQL Driver
> npm install mysql2 */
const mysql = require("mysql2");

const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Madhu@12345",
    database: "school"
});

connection.connect((err) => {

    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to MySQL");
    }

});

module.exports = connection;
