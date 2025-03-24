const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
var url = "mongodb://localhost:27017/";
const { MongoClient } = require("mongodb");

function generateAccessToken(email, remember) {
  dotenv.config();
  if (remember) {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
  } else {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, {
      expiresIn: "1800s",
    });
  }
}

function authenticateToken(authHeader) {
  dotenv.config();
  const token = authHeader && authHeader.split(" ")[1];
  return jwt.verify(token, process.env.TOKEN_SECRET);
}

function getEmailFromAuth(authHeader) {
  dotenv.config();
  const token = authHeader && authHeader.split(" ")[1];
  if (jwt.verify(token, process.env.TOKEN_SECRET)) {
    return jwt.decode(token).email;
  } else {
    return false;
  }
}

async function getIDFromAuth(authHeader) {
  dotenv.config();
  const token = authHeader && authHeader.split(" ")[1];
  if (jwt.verify(token, process.env.TOKEN_SECRET)) {
    var email = jwt.decode(token).email;
    var client = new MongoClient(url);
    var database = client.db("ISL");
    var collection = database.collection("users");
    var user = await collection.findOne({ email });
    return user._id;
  } else {
    return false;
  }
}

module.exports = {
  getEmailFromAuth,
  authenticateToken,
  generateAccessToken,
  getIDFromAuth,
};