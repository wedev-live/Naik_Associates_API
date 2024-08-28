// const express = require("express");
// const cors = require("cors");
// const session = require("express-session");
// const mongoose = require("mongoose");

// // const dbConn = require("./config/db.config.js");

// const errorLogSchema = new mongoose.Schema({
//   message: String,
//   source: String,
//   stack: String,
//   level: String,
//   timestamp: { type: Date, default: Date.now },
// });

// const ErrorLog = mongoose.model("ErrorLog", errorLogSchema);
// console.log(ErrorLog,'ErrorLogErrorLog')

// // User Schema and Model
// const userSchema = new mongoose.Schema({
//   image: Array,
//   name: String,
//   email: { type: String, unique: true },
//   phone: { type: String, unique: true },
//   house: String,
//   city: String,
//   state: String,
//   zipCode: String,
//   country: String,
//   // image: String,
//   hash: String,
//   salt: String,
//   addressCheck: { type: Boolean, default: false },
//   billingAddress: {
//     fullName: String,
//     billingEmail: String,
//     phone: String,
//     house: String,
//     city: String,
//     state: String,
//     zipCode: Number,
//     country: String,
//   },
//   shippingAddress: {
//     fullName: String,
//     shippingEmail: String,
//     phone: String,
//     house: String,
//     city: String,
//     state: String,
//     zipCode: Number,
//     country: String,
//   },
//   isAdmin: { type: Boolean, default: false },
//   isStaff: {
//     status: { type: Boolean, default: false },
//     surname: String,
//     permissions: Array,
//   },
//   emailVerified: String,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   resetPasswordToken: String,
//   resetPasswordExpires: Date,
//   orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
//   favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
// });

// const User = mongoose.model("User", userSchema);

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));

// app.get("/", (req, res) => {
//   res.send({ status: "OK" });
// });

// app.get("/user",async (req, res) => {
//   await User.find({}, (err, users) => {
//     if (err) {
//       console.error("Error fetching users:", err);
//       res.status(500).send({ error: "Failed to fetch users" });
//     } else {
//       console.log(users);
//       res.send({ users });
//     }
//   });
// });

// const PORT = process.env.PORT || 3006;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });



const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema({
  message: String,
  source: String,
  stack: String,
  level: String,
  timestamp: { type: Date, default: Date.now },
});

const ErrorLog = mongoose.model("ErrorLog", errorLogSchema);

// User Schema and Model
const userSchema = new mongoose.Schema({
  image: Array,
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  house: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  hash: String,
  salt: String,
  addressCheck: { type: Boolean, default: false },
  billingAddress: {
    fullName: String,
    billingEmail: String,
    phone: String,
    house: String,
    city: String,
    state: String,
    zipCode: Number,
    country: String,
  },
  shippingAddress: {
    fullName: String,
    shippingEmail: String,
    phone: String,
    house: String,
    city: String,
    state: String,
    zipCode: Number,
    country: String,
  },
  isAdmin: { type: Boolean, default: false },
  isStaff: {
    status: { type: Boolean, default: false },
    surname: String,
    permissions: Array,
  },
  emailVerified: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

const User = mongoose.model("User", userSchema);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // Use environment variable for secret
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.send({ status: "OK" });
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    // Optionally log the error to MongoDB
    const errorLog = new ErrorLog({
      message: err.message,
      source: "GET /user",
      stack: err.stack,
      level: "critical",
    });
    await errorLog.save();
    res.status(500).send({ error: "Failed to fetch users" });
  }
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

