const { MongoClient } = require("mongodb");
var url = "mongodb://localhost:27017/";

async function CheckEmailExists(email) {
  var client = new MongoClient(url);
  var database = client.db("ISL");
  var collection = database.collection("users");

  var count = await collection.countDocuments({
    email: email,
  });

  return count >= 1;
}

module.exports = { CheckEmailExists };