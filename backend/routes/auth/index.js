var express = require("express");
var router = express.Router();
var cryptojs = require("crypto-js");
const { MongoClient } = require("mongodb");
const { generateAccessToken } = require("./functions");
var url = "mongodb://localhost:27017/";

router.post("/", async function (req, res) {
  try {
    var email = req.body.email.trim().toLowerCase(); // Normalize email to lowercase
    var password = cryptojs.SHA512(req.body.password).toString();
    console.log(req.body);

    var client = new MongoClient(url);
    var database = client.db("ISL");
    var collection = database.collection("users");

    // Perform a case-insensitive email match
    var user = await collection.countDocuments({
      email: { $regex: `^${email}$`, $options: "i" }, // Case-insensitive match
      password, // Password is hashed and matched exactly
    });

    if (user === 1) {
      var token = generateAccessToken(email, req.body.remember);
      res.status(200).json({ token });
    } else {
      res.status(401).send(); // Unauthorized
    }

    client.close();
  } catch (error) {
    console.log(error);
    res.status(500).send(); // Internal server error
  }
});

module.exports = router;