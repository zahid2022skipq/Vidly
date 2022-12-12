import debug from "debug";

import express from "express";
import config from "config";
import morgan from "morgan";

import dotenv from "dotenv";

import genre from "./routes/genre.js";
import homeRoute from "./routes/home.js";

dotenv.config();

const app = express();
const startupDebugger = debug("app:startup");
const dbDebugger = debug("app:db");

app.use(express.json());
app.use("/vidly/genre", genre);
app.use("/", homeRoute);

app.set("view engine", "pug");
app.set("views", "./views"); //default value

console.log(`Applicaion name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.server")}`);
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled..");
}

dbDebugger("Database conntected...");

app.listen(3000, () => {
  console.log("====================================");
  console.log("App Listening on 3000");
  console.log("====================================");
});
