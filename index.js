const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
const config = JSON.parse(fs.readFileSync("config.json").toString());

app.post("/api/push", (req, res) => {
  const body = req.body;
  console.log(body);
});

app.listen(config.server.port,
  () => console.log("Listen on " + config.server.port));