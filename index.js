import debug from "debug";

import express from "express";
import config from "config";
import Joi from "joi";
import morgan from "morgan";

import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

app.set("view engine", "pug");
app.set("views", "./view"); //default value

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

const genre = [
  { id: 1, name: "g1" },
  { id: 2, name: "g2" },
  { id: 3, name: "g3" },
  { id: 4, name: "g4" },
];

dbDebugger("Database conntected...");

app.get("/", (req, res) => {
  res.render("index", { title: "My Express App", message: "App is running" });
});

app.get("/vidly/genre", (req, res) => {
  try {
    return res.status(200).send({ message: "Genre", data: genre });
  } catch (error) {
    return res.send(error);
  }
});

app.post("/vidly/genre", (req, res) => {
  const { name } = req.body;
  const genreId = genre.length + 1;
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const { error } = Joi.validate(req.body, schema);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const newGenre = { id: genreId, name };
  try {
    genre.push(newGenre);
    return res.status(200).send(genre);
  } catch (error) {
    return res.send(error);
  }
});

app.listen(3000, () => {
  console.log("====================================");
  console.log("App Listening on 3000");
  console.log("====================================");
});
