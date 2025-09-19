const express = require("express");
const sqlite3 = require("sqlite3");
const { engine } = require("express-handlebars");

const port = 8080;
const app = express();

// MODEL
const projects = [
  {
    id: "1",
    me: "Counting people with a camera",
    type: "Research",
    type: "Research",
    desc: "The purpose of this project is to count people passing through a corridor and to know how many are in the room at a certain time.",
    year: 2022,
    dev: "Python and OpenCV (Computer vision) library",
    url: "/img/counting.png",
  },
  {
    id: "2",
    name: "Visualisation of 3D medical images",
    type: "Research",
    desc: "The project makes a 3D model of the analysis of the body of a person and displays the detected health problems. It is useful for doctors to view in 3D their patients and the evolution of a disease.",
    year: 2012,
    url: "/img/medical.png",
  },
  {
    id: "3",
    name: "Multiple questions system",
    type: "Teaching",
    des: "During the lockdowns in France, this project was useful to test the students online with a Quizz system.",
    year: 2021,
    url: "/img/qcm07.png",
  },
  {
    id: "4",
    name: "Image comparison with the Local Dissmilarity Map",
    desc: "The project is about finding and quantifying the differences between two images of the same size. The applications were numerous: satellite imaging, medical imaging,...images of the same size.",
    year: 2020,
    type: "Research",
    url: "/img/diaw02.png",
  },
  {
    id: "5",
    name: "Management system for students' internships",
    desc: "This project was about the creation of a database to manage the students' internships.",
    year: 2012,
    type: "Teaching",
    url: "/img/management.png",
  },
  {
    id: "6",
    name: "Magnetic Resonance Spectroscopy",
    desc: "Analysis of signals and images from Magnetic Resonance Spectroscopy and Imaging.",
    year: 2013,
    type: "Research",
    url: "/img/yu00.png",
  },
  {
    id: "7",
    name: "Signal Analysis for Detection of Epileptic Deseases",
    desc: "This project was about the detection of epileptic problems in signals.",
    year: 2019,
    type: "Research",
    url: "/img/youssef00.png",
  },
];

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

// DEFINE THE /about ROUTE (MY CV)
app.get("/about", (req, res) => {
  res.render("mycv-02.handlebars");
});

// DEFINE THE /contact ROUTE (MY Contact)
app.get("/contact", (req, res) => {
  res.render("contact.handlebars");
});

// DEFINE THE /projects ROUTE (MY projects)
app.get("/projects", (req, res) => {
  model = { projects };
  res.render("projects.handlebars", model);
});

app.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}...`);
});
