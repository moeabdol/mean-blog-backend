const mongoose = require("mongoose");
const config   = require("./config");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === "development") {
  mongoose.connect(config.uri,{
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  }, (err) => {
    if (err) console.log("Could not connect to database", err);
    else console.log("Connected to database", config.uri);
  });
}

module.exports = mongoose;
