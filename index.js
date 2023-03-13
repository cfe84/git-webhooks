const express = require("express");
const fs = require("fs");
const { PushHandler } = require("./PushHandler");

const app = express();
app.use(express.json());
const config = JSON.parse(fs.readFileSync("config.json").toString());
const handler = new PushHandler(config.repos);

app.post("/api/push", (req, res) => {
  const body = req.body;
  console.log(body.hook?.config?.secret);
  const isPush = pushEvent.hook.events.indexOf("push") >= 0;
  if (isPush) {
    handler.onPush(body);
  }
  
  console.log(body);
});

app.listen(config.server.port,
  () => console.log("Listen on " + config.server.port));