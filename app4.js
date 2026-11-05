/* app4.js
(d) Write a program to implement the CRUD operations using 
Express.js
Execution:
Open postman and test the following routes:
1. GET http://localhost:3000/students
2. POST http://localhost:3000/students
3. PUT http://localhost:3000/students/:id
4. DELETE http://localhost:3000/students/:id

To add students thru Postman, select Body → raw → JSON and
 enter the student data in JSON format.
[
    {
        "id": 3,
        "name": "Raju"
    },
    {
        "id": 4,
        "name": "Gopi"
    }
]
*/

const express = require("express");

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Prem" },
    { id: 2, name: "Kumar" },
];

// CREATE
app.post("/students", (req, res) => {
    students.push(req.body);
    res.send("Student Added");
});

// READ
app.get("/students", (req, res) => {
    res.json(students);
});

// UPDATE
app.put("/students/:id", (req, res) => {

    const student = students.find(s => s.id == req.params.id);

    if(student){
        student.name = req.body.name;
        res.send("Student Updated");
    }
    else{
        res.send("Student Not Found");
    }

});

// DELETE
app.delete("/students/:id", (req, res) => {
    students = students.filter(s => s.id != req.params.id);
    res.send("Student Deleted");
});

app.listen(3000, () => {
    console.log("Server Running");
});
