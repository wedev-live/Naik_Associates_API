const express = require("express");
const router = express.Router();

const { getUserById, getUserData } = require("../controllers/user.controller");



// router.get("/user/:id", getUserById);  // Fetch a single user by ID
// router.get("/users", getUserData);      // Fetch all user data

module.exports = router;
