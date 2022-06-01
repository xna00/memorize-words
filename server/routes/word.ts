import express, { Express } from "express";
import { Word } from "../models/Word";
import type { Word as WordType } from "../../types/models";
import { minDistance } from "../tools/minDistance";
import { ProtoWord } from "../models";

export default (app: Express) => {
  console.log(Word, "word");
  const router = express.Router();
  router.get("/:word/lookslike", async (req, res) => {
    const word = req.params.word;
    const ret: string[] = (await Word.findAll())
      .filter((w) => minDistance(word, w.word) < word.length / 2 - 1)
      .map((w) => w.word);
    console.log(ret);
    res.send(ret);
  });
  router.get("/:word", async (req, res) => {
    const word = await Word.findOne({
      where: {
        word: req.params.word,
      },
      include: { model: ProtoWord, as: "proto" },
    });
    res.send(word);
  });

  router.get("/", async (req, res) => {
    const words = await Word.findAll({
      include: "proto",
    });
    res.send(words);
  });

  

  app.use("/api/words", router);
};
