const express = require("express");
const fs = require("fs");
const { PushHandler } = require("./PushHandler");

const app = express();
app.use(express.json());
const config = JSON.parse(fs.readFileSync("config.json").toString());
const handler = new PushHandler(config.repos);

app.post("/api/push", async (req, res) => {
  const body = req.body;
  const isPush = req.header("X-GitHub-Event") === "push";
  if (isPush) {
    try {
      await handler.onPushAsync(body);
    } catch(error) {
      res.status(500);
      res.send(error);
      res.end();
      return;
    }
    console.log("success");
    res.send("success");
  }
  res.end();
});

app.listen(config.server.port,
  () => console.log("Listen on " + config.server.port));