import express from "express";

const app = express();

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

app.listen(3000, () => {
  console.log("====================================");
  console.log("App Listening on 3000");
  console.log("====================================");
});
