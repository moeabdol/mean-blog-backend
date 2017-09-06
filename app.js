const express     = require("express");
const bodyParser  = require("body-parser");
const cors        = require("cors");
const usersRoutes = require("./routes/users");
const blogRoutes = require("./routes/blog");
const app         = express();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

require("./config/mongoose");

app.use(cors());

app.use(bodyParser.json());

app.use("/api", usersRoutes);
app.use("/api", blogRoutes);

app.get("*", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
