const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";

async function CheckEmailExists(email) {
  var client = new MongoClient(url);
  var database = client.db("ISL");
  var collection = database.collection("users");

  // Use a case-insensitive regex to check if the email exists
  var count = await collection.countDocuments({
    email: { $regex: `^${email}$`, $options: "i" }, // Case-insensitive match
  });

  return count >= 1;
}

module.exports = { CheckEmailExists };