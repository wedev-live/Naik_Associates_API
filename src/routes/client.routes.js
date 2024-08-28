const express = require("express");
const { clientupsert, getAllClient } = require("../controllers/client.controller");
const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).send({ status: "Data From Client" });
});

route.post("/clientupsert", clientupsert);
route.get("/getallclient", getAllClient);

module.exports = route;
