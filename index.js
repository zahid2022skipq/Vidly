import debug from "debug";

import express from "express";
import config from "config";
import morgan from "morgan";

import dotenv from "dotenv";

import genre from "./routes/genre.js";

dotenv.config();
const app = express();

app.use(express.json());

app.set("view engine", "pug");
app.set("views", "./views"); //default value

const startupDebugger = debug("app:startup");
const dbDebugger = debug("app:db");

console.log(`Applicaion name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.server")}`);

console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled..");
}

dbDebugger("Database conntected...");

app.use("/vidly/genre", genre);

app.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "App is running" });
});

app.listen(3000, () => {
  console.log("====================================");
  console.log("App Listening on 3000");
  console.log("====================================");
});
