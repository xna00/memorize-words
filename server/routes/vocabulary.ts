import express, { Express, Request } from "express";
import Word from "../models/Word";
import type { Word as WordType } from "../../types/models";
import Vocabulary from "../models/Vocabulary";
import auth from "../middleware/auth";
import { minDistance } from "../tools/minDistance";
import UserWord from "../models/UserWord";

export default (app: Express) => {
  console.log(Word);
  const router = express.Router();
  router.post("/", async (req: any, res) => {
    console.log(req.body);
    const _words: string[] = req.body.words;
    const name: string = req.body.name;
    const words: string[] = [];
    const user: string = req.user._id;
    for (const word of _words) {
      const tmp = await Word.find({ word });
      if (tmp) words.push(word);
    }
    const v = await Vocabulary.create({ name, users: [req.user._id] });
    words.forEach(async (word) => {
      let f = await UserWord.findOne({ word });
      console.log(f);
      if (f) {
        (f.in as any).push(v);
        f.save();
      } else {
        f = await UserWord.create({
          word,
          user,
          in: [v],
        });
      }
    });
    res.send(v);
  });

  router.get("/", (req: any, res) => {
    Vocabulary.find({
      users: req.user._id,
    }).then((r) => res.send(r));
  });

  router.get("/:id", async (req: any, res) => {
    const query = req.query;
    const user = req.user._id;
    console.log(query);
    const id = req.params.id;
    let {
      pageNum,
      pageSize,
      like,
      time,
      inTimeRange,
      grade,
      learnCount,
      isLearnCount,
    } = query;
    pageNum = Number.isInteger(Number(pageNum)) ? Number(pageNum) : 1;
    pageSize = Number.isInteger(Number(pageSize)) ? Number(pageSize) : 10;
    const v = await Vocabulary.findById(id);
    console.log("vv", v);
    if (!v) {
      res.send({});
      return;
    }
    // if (like) {
    //   let distance = like!.length / 2 - 1;
    //   distance = distance <= 0 ? 1 : distance;
    //   v.words = v.words.filter((w) => minDistance(w, like!) < distance);
    // }
    const tmp: any = {
      user,
      in: v,
    };
    grade &&
      (tmp.grade = {
        $gte: grade[0],
        $lte: grade[1],
      });
    if (time) {
      if (inTimeRange === "") {
        tmp.$or = [
          { updatedAt: { $gte: time[1] } },
          { updatedAt: { $lte: time[0] } },
        ];
      } else {
        tmp.updatedAt = {
          $gte: time[0],
          $lte: time[1],
        };
      }
    }
    if (Number.isInteger(parseInt(learnCount))) {
      const count = parseInt(learnCount);
      if (isLearnCount !== "") {
        tmp.learnCount = count;
      } else {
        tmp.learnCount = {
          $ne: count,
        };
      }
    }
    const _words = await UserWord.find(tmp)
      .skip(pageSize * (pageNum - 1))
      .limit(pageSize);
    console.log(_words, "_words");
    const words = await Word.find({
      word: {
        // $in
        $in: _words.map((w) => w.word),
      },
    });
    console.log(words);
    res.send({
      total: words.length,
      data: words,
    });
  });
  app.use("/api/vocabularies", auth(), router);
};
