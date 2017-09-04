const express     = require("express");
const bodyParser  = require("body-parser");
const usersRoutes = require("./routes/users");
const app         = express();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

require("./config/mongoose");

app.use(bodyParser.json());

app.use("/api", usersRoutes);

app.get("*", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
