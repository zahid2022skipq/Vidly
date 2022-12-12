import Joi from "joi";

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
