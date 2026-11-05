/*To perform CRUD operations on students table of school db
of MySQL. The students table is with columns sno,name, total
INSTALL:
>npm install express mysql2

Run server:
>node app6.js
IN BROWSER:
1)To list all students
http://localhost:3000/students

2)To list only one student
http://localhost:3000/students/101

3)To insert student details using Postman
POST http://localhost:3000/students
IN BODY OF POSTMAN
{"sno" :777,
 "name":"Mr.Seven rao",
 "total":777
}

4)To Update student total
PUT http://localhost:3000/students/101
IN POSTMAN BODY
{
 "total":111
}

5)To delete student with sno 777 using POSTMAN
DELETE http://localhost:3000/students/777
*/
const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Madhu@12345",
    database: "school",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        process.exit(1);
    }

    console.log("Prem! Connected to MySQL Database");
});

// =====================================
// READ ALL STUDENTS
// =====================================
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to fetch students" });
        }
        res.json(result);
    });
});

// =====================================
// READ ONE STUDENT
// =====================================
app.get("/students/:sno", (req, res) => {
    db.query(
        "SELECT * FROM students WHERE sno=?",
        [req.params.sno],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Failed to fetch student" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "Student Not Found" });
            }

            res.json(result[0]);
        }
    );
});

// =====================================
// INSERT STUDENT
// =====================================
app.post("/students", (req, res) => {
    const { sno, name, total } = req.body;

    if (sno === undefined || name === undefined || total === undefined) {
        return res.status(400).json({ error: "sno, name and total are required" });
    }

    db.query(
        "INSERT INTO students (sno, name, total) VALUES (?, ?, ?)",
        [sno, name, total],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Failed to insert student" });
            }

            res.status(201).json({ message: "Student Inserted Successfully", insertId: result.insertId });
        }
    );
});

// =====================================
// UPDATE STUDENT
// =====================================
app.put("/students/:sno", (req, res) => {
    const { name, total } = req.body;
    const sno = req.params.sno;

    if (name === undefined && total === undefined) {
        return res.status(400).json({ error: "Provide name or total to update" });
    }

    const updates = [];
    const values = [];

    if (name !== undefined) {
        updates.push("name=?");
        values.push(name);
    }

    if (total !== undefined) {
        updates.push("total=?");
        values.push(total);
    }

    values.push(sno);

    db.query(
        `UPDATE students SET ${updates.join(", ")} WHERE sno=?`,
        values,
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Failed to update student" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Student Not Found" });
            }

            res.json({ message: "Student Updated Successfully" });
        }
    );
});

// =====================================
// DELETE STUDENT
// =====================================
app.delete("/students/:sno", (req, res) => {
    db.query(
        "DELETE FROM students WHERE sno=?",
        [req.params.sno],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Failed to delete student" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Student Not Found" });
            }

            res.json({ message: "Student Deleted Successfully" });
        }
    );
});

// =====================================
app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});