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
//------------ select all
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
//------------ select with id
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
  });
});
//------------ update
app.put("/data/members/:id", (req, res) => {
  let rid = 0;
  let role_name = req.body.role_name;
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
    join_data: "2024-11-18",
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
app.put("/data/events/:id", (req, res) => {
  let id = req.params.id;
  let event = {
    event_name: req.body.event_name,
    event_date: req.body.event_date,
    event_duration: req.body.event_duration,
    event_location: req.body.event_location,
    event_type: req.body.event_type,
    event_discription: req.body.event_discription,
  };
  let query = `
        UPDATE events 
        SET event_name = '${event.event_name}',
        event_date   = '2024-11-18',
        event_duration=  ${event.event_duration},
        event_location=  '${event.event_location}',
        event_type=  '${event.event_type}'
        WHERE EVENT_ID = ${id}
      `;
  db.query(query, (err, results) => {
    if (err) {
      res.send({ respond: "Failed to add event" });
      throw err;
    }
    res.send({ respond: "Event added successfully" });
  });
});

//------------ add
app.post("/data/members", (req, res) => {
  let rid = 0;
  let role_name = req.body.role_name;
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
    join_data: "2024-11-18",
    role_id: rid,
  };
  console.log(member);
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
  db.query(query, (err, results) => {
    if (err) {
      res.send({ respond: "Member is not added" });
      throw err;
    }
    res.send({ respond: "Member added" });
  });
});
app.post("/data/events", (req, res) => {
  let event = {
    event_name: req.body.event_name,
    event_date: req.body.event_date,
    event_duration: req.body.event_duration,
    event_location: req.body.event_location,
    event_type: req.body.event_type,
    event_discription: req.body.event_discription,
  };
  let query = `
      INSERT INTO events (event_name,event_date,event_duration,event_location,event_type,EVENT_DISCRIPTION)
      VALUES (
      '${event.event_name}',
      '${event.event_date}',
      ${event.event_duration},'
      ${event.event_location}',
      '${event.event_type}',
      '${event.event_discription}'
  )
    `;
  db.query(query, (err, results) => {
    if (err) throw err;
  });
});
//------------ delete
app.delete("/data/members/:id", (req, res) => {
  let id = req.params.id;
  let query = `
    DELETE FROM members
    WHERE MEMBER_ID = ${id}
    `;
  db.query(query, (err) => {
    if (err) throw err;
  });
});
app.delete("/data/events/:id", (req, res) => {
  let id = req.params.id;
  let query = `
    DELETE FROM events
    WHERE EVENT_ID = ${id}
    `;
  db.query(query, (err) => {
    if (err) throw err;
  });
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("listening");
});
