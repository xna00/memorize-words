import express, { Express } from "express";
import Word from "../models/Word";
export default (app: Express) => {
  console.log(Word);
  const router = express.Router();
  router.get("/:word", (req, res) => {
    const word = Word.create({
      word: req.params.word,
    });
    res.send(word);
  });

  app.use("/api/words", router);
};
