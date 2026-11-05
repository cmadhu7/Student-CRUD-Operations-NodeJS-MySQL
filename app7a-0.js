//CURD operations of students table of school database
/*
1. Initialize PROJECT
>npm init -y
The above command will initialize the project and will 
create a file package.json

2. >npm install express mysql8
Install express mysql8 in current folder

EXECUTION: To open index.html
GET http://localhost:3000/
*/
const express = require("express");
const mysql = require("mysql8");
const path = require("path");

const app = express();
app.use(express.json());

// Serve the root directory so index.html and the other browser pages load correctly
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

//Connection establishment with school database
const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "Madhu@12345",
    database: "school"
});

db.connect((err)=>{
    if(err)
        throw err;
    console.log("Connected to MySQL");
});

//TO GET DETAILS OF ALL STUDENTS
app.get("/students",(req,res)=>{

    db.query(
        "SELECT sno AS student_id, name AS student_name, total FROM students",
        (err,result)=>{

            if(err) {
                res.status(500).send(err.message);
                return;
            }

            res.json(result);

        });

});
//TO GET THE DETAILS OF ONE STUDENT
app.get("/students/:sno",(req,res)=>{

    db.query(
        "SELECT sno AS student_id, name AS student_name, total FROM students WHERE sno=?",
        [req.params.sno],
        (err,result)=>{

            if(err) {
                res.status(500).send(err.message);
                return;
            }

            res.json(result);

        });

});

//TO INSERT STUDENT DATA INTO students TABLE
app.post("/students",(req,res)=>{
        const {sno,name,total}=req.body;
    db.query(
        "INSERT INTO students(sno,name,total) VALUES(?,?,?)",
        [sno,name,total],
        (err)=>{
            if(err)
            {   res.status(500).send(err.message);
                return;
            }
            res.send("Student Inserted");
        });

});

//TO UPDATE STUDENT DETAILS
app.put("/students/:sno",(req,res)=>{

    const {name,total}=req.body;

    db.query(
        "UPDATE students SET name=?, total=? WHERE sno=?",
        [name,total,req.params.sno],
        (err,result)=>{

            if(err)
            {
                res.status(500).send(err.message);
                return;
            }

            if(result.affectedRows==0)
                res.status(404).send("Student NOT found");
            else
                res.send("Student Updated");

        });

});

//TO DELETE STUDENT DETAILS
app.delete("/students/:sno",(req,res)=>{

    db.query(
        "DELETE FROM students WHERE sno=?",
        [req.params.sno],
        (err,result)=>{
            if(err)
            {
                res.status(500).send(err.message);
                return;
            }

            if(result.affectedRows==0)
                res.status(404).send("Student NOT found to delete");
            else
                res.send("Student Deleted");

        });

});

//Server to listen of port number 3000
app.listen(3000,()=>{

    console.log("Server running at http://localhost:3000");

});