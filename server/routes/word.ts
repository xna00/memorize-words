import express, { Express } from "express";
import Word from "../models/Word";
import type { Word as WordType } from "../../types/models";
import { minDistance } from "../tools/minDistance";

export default (app: Express) => {
  console.log(Word);
  const router = express.Router();
  router.get("/:word/lookslike", async (req, res) => {
    const word = req.params.word;
    const ret: string[] = (await Word.find())
      .filter((w) => minDistance(word, w.word) < word.length / 2 - 1)
      .map((w) => w.word);
    console.log(ret);
    res.send(ret);
  });
  router.get("/:word", async (req, res) => {
    const word = await Word.find({
      word: req.params.word,
    });
    res.send(word);
  });

  app.use("/api/words", router);
};
