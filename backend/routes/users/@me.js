const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { authenticateToken, getEmailFromAuth } = require("../auth/functions");

const url = "mongodb://localhost:27017/";
const dbName = "ISL";

router.get("/", async (req, res) => {
  let client;

  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Token received:", token);

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Authorization token is missing" });
    }

    // Verify the token
    try {
      authenticateToken(authHeader);
      console.log("Token verified successfully");
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return res.status(403).json({
        message: "Invalid or expired token",
        loggedIn: false,
      });
    }

    // Extract the email from the token
    let email;
    try {
      email = getEmailFromAuth(authHeader);
      console.log("Email extracted from token:", email);
    } catch (err) {
      console.error("Failed to extract email from token:", err.message);
      return res.status(400).json({ message: "Invalid token payload" });
    }

    if (!email) {
      console.log("Email is undefined after extraction");
      return res.status(400).json({ message: "Invalid token payload" });
    }

    // Connect to MongoDB
    try {
      client = new MongoClient(url);
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Failed to connect to MongoDB:", err.message);
      return res.status(500).json({ message: "Database connection failed" });
    }

    const database = client.db(dbName);
    const collection = database.collection("users");

    // Find the user in the database
    const me = await collection.findOne({ email });
    if (!me) {
      console.log("User not found in database");
      return res.status(404).json({ message: "User not found" });
    }

    // Include the user's ID and other details in the response
    const userResponse = {
      id: me._id, // MongoDB ObjectId
      email: me.email,
      name: me.name, // Include other fields as needed
    };

    console.log("User details retrieved successfully:", userResponse);
    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Error in /me endpoint:", error.message);
    res.status(500).json({
      message: "Could not load your details",
      loggedIn: false,
    });
  } finally {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
});

module.exports = router;