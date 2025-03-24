var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";
var crypto = require("crypto-js");
var UserFunctions = require("./functions");
const { getMe } = require("./@me");

router.get("/@me", (req, res) => getMe(req, res));

router.post("/", async function (req, res) {
  try {
    var email = req.body.email;
    var password = crypto.SHA512(req.body.password).toString();
    var sname = req.body.sname;
    var fname = req.body.fname;
    var client = new MongoClient(url);
    var database = client.db("ISL");
    var collection = database.collection("users");

    if (await UserFunctions.CheckEmailExists(email)) {
      res.status(500).json({ message: "Email already in use" });
    } else {
      var newUser = await collection.insertOne({
        email,
        password,
        fname,
        sname,
      });

      if (newUser.acknowledged) {
        res.json({ message: "New user created" });
      } else {
        res
          .status(500)
          .json({ message: "An error occured and could not create new user" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not create user" });
  }
});

module.exports = router;