const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
var url = "mongodb://localhost:27017/";
const { MongoClient } = require("mongodb");

// Load environment variables
dotenv.config();

function generateAccessToken(email, remember) {
  console.log("Signing token with secret key:", process.env.TOKEN_SECRET); // Debug log
  if (remember) {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: "7 days" });
  } else {
    return jwt.sign({ email }, process.env.TOKEN_SECRET, {
      expiresIn: "1800s", // 30 minutes
    });
  }
}

function authenticateToken(authHeader) {
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  console.log("Verifying token with secret key:", process.env.TOKEN_SECRET); // Debug log
  return jwt.verify(token, process.env.TOKEN_SECRET);
}

function getEmailFromAuth(authHeader) {
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  if (jwt.verify(token, process.env.TOKEN_SECRET)) {
    return jwt.decode(token).email;
  } else {
    throw new Error("Invalid token");
  }
}

async function getIDFromAuth(authHeader) {
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  if (jwt.verify(token, process.env.TOKEN_SECRET)) {
    const email = jwt.decode(token).email;
    const client = new MongoClient(url);
    await client.connect(); // Ensure the client is connected
    const database = client.db("ISL");
    const collection = database.collection("users");
    const user = await collection.findOne({ email });
    await client.close(); // Close the connection after the query
    return user._id;
  } else {
    throw new Error("Invalid token");
  }
}

module.exports = {
  getEmailFromAuth,
  authenticateToken,
  generateAccessToken,
  getIDFromAuth,
};