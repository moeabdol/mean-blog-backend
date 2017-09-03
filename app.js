const express  = require("express");
const mongoose = require("mongoose");
const config   = require("./config");
const app      = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,{
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
}, (err) => {
  if (err) console.log("Could not connect to database", err);
  else console.log("Connected to database", config.db);
});

app.get("*", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
