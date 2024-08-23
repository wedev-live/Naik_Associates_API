const express = require("express");
const cors = require("cors");
var session = require('express-session')

// * FOR GLOBAL EXCEPTION HANDLING * //
var dbConn = require("./config/db.config.js");
process.on("uncaughtException", (err) => {
  console.error("An uncaught exception occurred:");
  console.error(err);

  dbConn.query(
    "call proc_ExceptionLog_Insert(?,?,?,?,?)",
    [err.message, "Quickbooks", "Quickbooks", err.stack, "E"],
    function (err, res) {
      if (err) {
        console.log("error");
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
});
// * END * //

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(session({secret: 'secret', resave: 'false', saveUninitialized: 'false'}))

app.get("/", (req, res) => {
  // Changes for the api heathcheck
  dbConn.query("SELECT 1", function (err, ressponse) {
    if (err) {
      res.send({ status: "Failed", error: err });
    } else {
      res.send({ status: "OK" });
    }
  });
});

const quickbooksroutes= require("./quickbook/src/routes/quickbooks.routes.js")
app.use('/api/v1/quickbooks', quickbooksroutes)

// set port, listen for requests
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


