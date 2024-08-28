// const mongoose = require("mongoose");
const userModel = require("../models/userModel"); 



exports.getUserById = async (req, res) => {
  const { id } = req.params;
  console.log("id",id)
  try {
  
    const user = await userModel.findById(id); 
    console.log("user",user)
    if (user) {
      return res.status(200).send({
        status: true,
        message: "User fetched successfully",
        data: user,
      });
    } else {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const users = await userModel.find();
    console.log("users",users) 
    return res.status(200).send({
      status: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
