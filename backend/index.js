const connectToMongo = require("./db");
const express = require("express");
const app = express();
const port = 5000;
const bcrypt = require("bcrypt");
var cors = require("cors");

app.use(cors());
connectToMongo();

// to use req.body,,, we have to use a middleware
app.use(express.json());

// routes that our app can use
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  console.log(req.url);
  res.send("Hello, it's garvit!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
