/*(a) Write a program to implement the "Hello World" 
message in the route through the browser using Express
app1.js*/
const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello World");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
/*
Run:
>node app1.js

Browser:
http://localhost:3000

Output:
Hello World
*/
