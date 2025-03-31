const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const { authenticateToken, getEmailFromAuth } = require("../auth/functions");

const url = "mongodb://localhost:27017/";
const dbName = "ISL";

router.get("/", async (req, res) => {
  let client;

  try {
    const token = req.headers["authorization"];
    console.log("Token received:", token);

    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Authorization token is missing" });
    }

    if (!authenticateToken(token)) {
      console.log("Token authentication failed");
      return res.status(403).json({
        message: "Invalid or expired token",
        loggedIn: false,
      });
    }

    const email = getEmailFromAuth(token);
    console.log("Email extracted from token:", email);

    if (!email) {
      console.log("Failed to extract email from token");
      return res.status(400).json({ message: "Invalid token payload" });
    }

    client = new MongoClient(url);
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db(dbName);
    const collection = database.collection("users");

    const me = await collection.findOne({ email });

    if (!me) {
      console.log("User not found in database");
      return res.status(404).json({ message: "User not found" });
    }

    delete me.password;
    res.status(200).json(me);
  } catch (error) {
    console.log("Error in /me endpoint:", error);
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