const express = require("express");
const sqlite3 = require("sqlite3");
const { engine } = require("express-handlebars");

const port = 8080;
const app = express();

// HANDLEBARS
app.engine("handlebars", engine()); // initialize the engine to be handlebars
app.set("view-engine", "handlebars"); // set handlebars as the view engine
app.set("views", "./views"); // define the vievs directory to be ./views

// DATABASE
const dbFile = "my-project-db.sqlite3.db";
db = new sqlite3.Database(dbFile);

// creates table Person at startup
db.run(
  `CREATE TABLE IF NOT EXISTS Person (pid INTEGER PRIMARY KEY, fname TEXT NOT NULL, lname TEXT NOT NULL, age INTEGER, email TEXT)`,
  function (error) {
    if (error) {
      // tests error: display error
      console.log("---> ERROR: ", error);
    } else {
      // tests error: no error, the table has been created
      console.log("---> Table created!");
      db.run(
        `INSERT INTO Person (fname, lname, age, email) VALUES ('John', 'Smith', 25, 'john.smith@example.com'), ('Jane', 'Doe', 30, 'jane.doe@mail.com'), ('Alex', 'Johnson', 40, 'alex.johnson@company.com'), ('Emily', 'Brown', 35, 'emily.brown@business.org'), ('Michael', 'Davis', 50, 'michael.davis@email.net'), ('Sarah', 'Miller', 28, 'sarah.miller@example.com'), ('David', 'Garcia', 45, 'david.garcia@mail.com'), ('Laura', 'Rodriguez', 32, 'laura.rodriguez@company.com'), ('Chris', 'Wilson', 27, 'chris.wilson@business.org'), ('Anna', 'Martinez', 22, 'anna.martinez@email.net'), ('James', 'Taylor', 53, 'james.taylor@example.com'), ('Patricia', 'Anderson', 44, 'patricia.anderson@mail.com'), ('Robert', 'Thomas', 38, 'robert.thomas@company.com'), ('Linda', 'Hernandez', 55, 'linda.hernandez@business.org'), ('William', 'Moore', 26, 'william.moore@email.net'), ('Barbara', 'Jackson', 37, 'barbara.jackson@example.com'), ('Richard', 'White', 49, 'richard.white@mail.com'), ('Susan', 'Lee', 24, 'susan.lee@company.com'), ('Joseph', 'Clark', 41, 'joseph.clark@business.org'), ('Jessica', 'Walker', 29, 'jessica.walker@email.net');`,
        function (err) {
          if (err) {
            console.log(err.message);
          } else {
            console.log("---> Rows inserted in the table Person.");
          }
        }
      );
    }
  }
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  /* res.send("Hello World!"); */
  res.render("home.handlebars");
});

app.get("/cv", (req, res) => {
  res.sendFile(__dirname + "/views/mycv-02.html"); //internal var def by node and it corresponds to where folder your project is
});

/* Could do the same for any pic/file requested 

    app.get("/something", (req, res) => {
      res.sendFile(__dirname + "/something.smt"); //internal var def by node and it corresponds to where folder your project is
    });

but it gets a lot, so you use the public and view folders and add the code: 

    app.use(express.static('public')) [line 5]

and it gives access to every incoming request to your public folder (imgs, stylesheets, js on client side...)

*/

app.get("/rawpersons", (req, res) => {
  db.all("SELECT * FROM Person", (err, rawPersons) => {
    if (err) {
      console.log("Error:..." + err);
    } else {
      console.log("Data foud, sending it back to the client...");
      res.send(rawPersons);
    }
  });
});

app.get("/listpersons", (req, res) => {
  db.all("SELECT * FROM Person", (err, rawPersons) => {
    if (err) {
      console.log("Error:..." + err);
    } else {
      listPersonsHTML = "<ul>";
      rawPersons.forEach(function (onePerson) {
        listPersonsHTML += "<li>";
        listPersonsHTML += `${onePerson.fname}, `;
        listPersonsHTML += `${onePerson.lname}, `;
        listPersonsHTML += `${onePerson.age}, `;
        listPersonsHTML += `${onePerson.email}`;
        listPersonsHTML += "</li>";
      });
      listPersonsHTML += "</ul>";
      console.log(listPersonsHTML);
      res.send(listPersonsHTML);
    }
  });
});

app.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}...`);
});
