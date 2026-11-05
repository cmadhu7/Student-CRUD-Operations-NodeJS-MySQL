/*app5.js  - To list the students data from student table 
of students database*/
const express = require("express");
const db = require("./db5");

const app = express();

app.get("/students", (req, res) => {

    db.query("SELECT * FROM student", (err, result) => {

        if(err)
            throw err;

        res.json(result);

    });

});

app.listen(3000, () => {

    console.log("Server Running");

});
/*
Run
>node app5.js

Browser
http://localhost:3000/students

Output (Example)
[
  {
    "student_id": 101,
    "student_name": "Ravi",
    "class": 6,
    "total": 750
  },
  {
    "student_id": 102,
    "student_name": "Priya",
    "class": 7,
    "total": 820
  }
]
*/