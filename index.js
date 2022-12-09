import express from "express";
import Joi from "joi";

const app = express();
app.use(express.json());

const genre = [
  { id: 1, name: "g1" },
  { id: 2, name: "g2" },
  { id: 3, name: "g3" },
  { id: 4, name: "g4" },
];

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
  const result = Joi.validate(req.body, schema);

  console.log("====================================");
  console.log(result.error.details[0].message);
  console.log("====================================");
  //   const newGenre = { id: genreId, name };
  //   try {
  //     genre.push(newGenre);
  //     return res.status(200).send(genre);
  //   } catch (error) {
  //     return res.send(error);
  //   }
});

app.listen(3000, () => {
  console.log("====================================");
  console.log("App Listening on 3000");
  console.log("====================================");
});
