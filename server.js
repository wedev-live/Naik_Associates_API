const express = require("express");
const cors = require("cors");
var session = require("express-session");
require("dotenv").config()
require("./config/db.config.js")
const clientRoutes = require("./src/routes/client.routes.js");



const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "secret", resave: "false", saveUninitialized: "false" })
);

app.get("/", (req, res) => {
  res.status(200).send({ status: "OK" });
});


app.use("/api/v1/client", clientRoutes);

app.all('/*', (req,res)=>{res.status(400).send({status:"HTTP Method Wrong"})})


// set port, listen for requests
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
