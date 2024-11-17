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
    console.log("All Events Selected");
  });
});
//------------
app.get("/data/members/:id", (req, res) => {
  let query = `
          SELECT * 
          FROM members
          JOIN ROLES USING (ROLE_ID)
          WHERE MEMBER_ID = ${req.params.id}
      `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("All members Selected");
  });
});
app.get("/data/events/:id", (req, res) => {
  let query = `
            SELECT * 
            FROM events
            WHERE EVENT_ID = ${req.params.id}
        `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
    console.log("All members Selected");
  });
});
//------------
app.put("/data/members/:id", (req, res) => {
  let rid = 0;
  let id = req.params.id;
  if (role_name.toUpperCase() === "EVENT MANAGMENT") {
    rid = 1;
  } else if (role_name.toUpperCase() === "DESIGN TEAM") {
    rid = 2;
  } else if (role_name.toUpperCase() === "MARKETING TEAM") {
    rid = 3;
  } else if (role_name.toUpperCase() === "PERSONAL RELATIONSHIPS") {
    rid = 4;
  } else if (role_name.toUpperCase() === "MANAGER") {
    rid = 5;
  }
  if (rid === 0) {
    console.log("invlaid role");
    return;
  }

  let member = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    join_data: req.body.join_date,
    role_id: rid,
  };
  let query = `
      UPDATE members 
      SET FIRST_NAME = '${member.first_name}',
      LAST_NAME   = '${member.last_name}',
      EMAIL=  '${member.email}' ,
      PHONE=  '${member.phone}',
      JOIN_DATE=  '${member.join_data}', 
      ROLE_ID=  ${member.role_id}
      WHERE MEMBER_ID = ${id}
    `;
  db.query(query, (err, results) => {
    if (err) throw err;
  });
});

app.post("/data/members", (req, res) => {
  let rid = 0;
  if (role_name.toUpperCase() === "EVENT MANAGMENT") {
    rid = 1;
  } else if (role_name.toUpperCase() === "DESIGN TEAM") {
    rid = 2;
  } else if (role_name.toUpperCase() === "MARKETING TEAM") {
    rid = 3;
  } else if (role_name.toUpperCase() === "PERSONAL RELATIONSHIPS") {
    rid = 4;
  } else if (role_name.toUpperCase() === "MANAGER") {
    rid = 5;
  }
  if (rid === 0) {
    console.log("invlaid role");
    return;
  }

  let member = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    join_data: req.body.join_date,
    role_id: rid,
  };
  let query = `
    INSERT INTO members (FIRST_NAME,LAST_NAME,EMAIL,PHONE,JOIN_DATE,ROLE_ID)
    VALUES (
     '${member.first_name}',
        '${member.last_name}',
            '${member.email}' ,
              '${member.phone}',
                   '${member.join_data}', 
                         ${member.role_id}
)
  `;
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("listening");
});
