/* app3.js
(c) Write a program to print the "Hello World" in the 
 console and Hello Students in browser using Express.js*/
const express = require("express");

const app = express();

app.get("/", (req, res) => {

    console.log("Hello World");

    res.send("Hello Students! Check the terminal console.");

});
app.get("/prem", (req, res) => {
    res.send(`
    <script>
        console.log("Hello World");
    </script>
    <h1>Hello Students of Kurnool!Open Browser Console</h1>
    `);
});

app.listen(3000, () => {
    console.log("Server Running");
});

/*Browser
http://localhost:3000
Terminal Output
Hello World

Browser Output
Hello Students!Check the terminal console.

Browser
http://localhost:3000/prem
See browser and Console by pressing F12

Note: In Node.js/Express, console.log() prints to the 
terminal (server console), not to the browser's 
Developer Console. 
*/