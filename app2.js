/*(b) Write a program to develop a small website 
with multiple routes using Express.js - ROUTING
app2.js*/

const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Us</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Page</h1>");
});

app.listen(3000, () => {
    console.log("Server Started at port 3000");
});

/*
Test in Browser:
http://localhost:3000/
Output:
Home Page
________________________________________
http://localhost:3000/about
Output:
About Us
________________________________________
http://localhost:3000/contact
Output
Contact Page
________________________________________
*/
