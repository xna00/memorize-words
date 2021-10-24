import express, { Express, Request } from "express";
import Word from "../models/Word";
import type { Word as WordType } from "../../types/models";
import Vocabulary from "../models/Vocabulary";
import auth from "../middleware/auth";
import { minDistance } from "../tools/minDistance";

export default (app: Express) => {
  console.log(Word);
  const router = express.Router();
  router.post("/", async (req: any, res) => {
    console.log(req.body);
    const _words: string[] = req.body.words;
    const name: string = req.body.name;
    const words: string[] = [];
    for (const word of _words) {
      const tmp = await Word.find({ word });
      if (tmp) words.push(word);
    }
    const v = await Vocabulary.create({ name, words, users: [req.user._id] });
    res.send(v);
  });

  router.get("/", (req: any, res) => {
    Vocabulary.find({
      users: req.user._id,
    }).then((r) => res.send(r));
  });

  router.get(
    "/:id",
    async (
      req: Request<
        { id: string },
        any,
        {},
        { pageNum: string | number; pageSize: string | number; word?: string }
      >,
      res
    ) => {
      const query = req.query;
      const id = req.params.id;
      let { pageNum, pageSize, word } = query;
      pageNum = Number.isInteger(Number(pageNum)) ? Number(pageNum) : 1;
      pageSize = Number.isInteger(Number(pageSize)) ? Number(pageSize) : 10;
      const v = await Vocabulary.findById(id);
      if (!v) {
        res.send({});
        return;
      }
      if (word) {
        let distance = word!.length / 2 - 1;
        distance = distance <= 0 ? 1 : distance;
        v.words = v.words.filter((w) => minDistance(w, word!) < distance);
      }
      const words = await Word.find({
        word: {
          $in: v.words.slice((pageNum - 1) * pageSize, pageNum * pageSize),
        },
      });
      res.send({
        total: v.words.length,
        data: words,
      });
    }
  );
  app.use("/api/vocabularies", auth(), router);
};
