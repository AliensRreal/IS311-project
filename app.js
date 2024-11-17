const express = require("express");
const mysql = require("mysql");
const app = express();
//------------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sequel",
  database: "student_club",
});
//------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
//------------
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});
//------------
app.get("/data/members", (req, res) => {
  let query = `
        SELECT * 
        FROM members
        JOIN ROLES USING (ROLE_ID)
    `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("All members Selected");
  });
});
app.get("/data/events", (req, res) => {
  let query = `
          SELECT * 
          FROM events
      `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("All members Selected");
  });
});
//------------

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("listening");
});
