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
  /*
    if(count>=1)
    {
        return true
    }else{
        return false;
    }
    */
}

module.exports = { CheckEmailExists };