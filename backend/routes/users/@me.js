const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { authenticateToken, getEmailFromAuth } = require("../auth/functions");

const url = "mongodb://localhost:27017/";
const dbName = "ISL";

// GET /users/me endpoint
router.get("/", async (req, res) => {
  let client;

  try {
    // Extract the token from the Authorization header
    const token = req.headers["authorization"];
    console.log("Token received:", token); // Debugging: Log the token

    if (!token) {
      console.log("No token provided"); // Debugging: Log missing token
      return res.status(401).json({ message: "Authorization token is missing" });
    }

    // Validate the token
    if (!authenticateToken(token)) {
      console.log("Token authentication failed"); // Debugging: Log invalid token
      return res.status(403).json({
        message: "Invalid or expired token",
        loggedIn: false,
      });
    }

    // Extract email from the token
    const email = getEmailFromAuth(token);
    console.log("Email extracted from token:", email); // Debugging: Log the email

    if (!email) {
      console.log("Failed to extract email from token"); // Debugging: Log missing email
      return res.status(400).json({ message: "Invalid token payload" });
    }

    // Connect to MongoDB
    client = new MongoClient(url);
    await client.connect();
    console.log("Connected to MongoDB"); // Debugging: Log successful connection

    const database = client.db(dbName);
    const collection = database.collection("users");

    // Find the user by email
    const me = await collection.findOne({ email });

    if (!me) {
      console.log("User not found in database"); // Debugging: Log if user is not found
      return res.status(404).json({ message: "User not found" });
    }

    // Remove sensitive information before sending the response
    delete me.password;
    res.status(200).json(me);
  } catch (error) {
    console.log("Error in /me endpoint:", error); // Debugging: Log any errors
    res.status(500).json({
      message: "Could not load your details",
      loggedIn: false,
    });
  } finally {
    // Ensure the MongoDB client is closed
    if (client) {
      await client.close();
      console.log("MongoDB connection closed"); // Debugging: Log connection closure
    }
  }
});

module.exports = router;