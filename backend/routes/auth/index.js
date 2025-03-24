var express = require("express");
var router = express.Router();
var cryptojs = require("crypto-js");
const { MongoClient } = require("mongodb");
const { generateAccessToken } = require("./functions");
var url = "mongodb://localhost:27017/";

router.post("/", async function (req, res) {
  try {
    var email = req.body.email;
    var password = cryptojs.SHA512(req.body.password).toString();
    console.log(req.body);
    var client = new MongoClient(url);
    var database = client.db("ISL");
    var collection = database.collection("users");

    // Check if user exists with provided email and password
    var user = await collection.countDocuments({
      email,
      password,
    });

    if (user === 1) {
      // Generate token if credentials are correct
      var token = generateAccessToken(email, req.body.remember);
      res.status(200).json({ token });
    } else {
      // If credentials are incorrect, return 401 Unauthorized status
      res.status(401).send(); // No need to send a message here, frontend will handle it
    }

    client.close();
  } catch (error) {
    console.log(error);
    // Return a 500 Internal Server Error status if there's an issue with the server
    res.status(500).send();
  }
});

module.exports = router;