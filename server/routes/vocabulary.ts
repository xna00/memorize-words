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
  router.delete("/:vocabulary/:word", async (req, res) => {
    const { vocabulary, word } = req.params;
    res.send(
      await UserWord.findOneAndDelete({
        word,
        in: vocabulary,
      })
    );
  });

  router.get("/", (req: any, res) => {
    console.log(req);
    console.log("hhhh");
    Vocabulary.find({
      users: req.user._id,
    }).then((r) => {
      console.log(r);
      res.send(r);
    });
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
      averageGrade,
      invertAverageGrade,
      learnCount,
      invertLearnCount,
      firstlyLearnTimeRange,
      invertFirstlyLearnTimeRange,
      lastlyLearnTimeRange,
      invertLastlyLearnTimeRange,
      recongizeAverageGrade,
      invertRecongizeAverageGrade,
      recongizeCount,
      invertRecongizeCount,
      spellAverageGrade,
      invertSpellAverageGrade,
      spellCount,
      invertSpellCount,
    } = query;
    pageNum = Number.isInteger(Number(pageNum)) ? Number(pageNum) : 1;
    pageSize = Number.isInteger(Number(pageSize)) ? Number(pageSize) : 10;
    const v = await Vocabulary.findById(id);
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
    const computeRange = (name, range, invert) => {
      if (range) {
        tmp[name] = {
          $gte: range[0],
          $lte: range[1],
        };
        if (invert === "true") {
          tmp[name] = {
            $not: tmp[name],
          };
        }
      }
    };
    computeRange(
      "firstlyLearnTime",
      firstlyLearnTimeRange,
      invertFirstlyLearnTimeRange
    );
    computeRange("updatedAt", lastlyLearnTimeRange, invertLastlyLearnTimeRange);
    recongizeAverageGrade = recongizeAverageGrade?.map(parseFloat);
    computeRange(
      "recongizeAverageGrade",
      recongizeAverageGrade,
      invertRecongizeAverageGrade
    );

    recongizeCount = recongizeCount?.map(parseFloat);
    computeRange("recongizeCount", recongizeCount, invertRecongizeCount);
    learnCount = learnCount?.map(parseFloat);
    computeRange("learnCount", learnCount, invertLearnCount);
    averageGrade = averageGrade?.map(parseFloat);
    computeRange("averageGrade", averageGrade, invertAverageGrade);
    spellAverageGrade = spellAverageGrade?.map(parseFloat);
    computeRange(
      "spellAverageGrade",
      spellAverageGrade,
      invertSpellAverageGrade
    );
    spellCount = spellCount?.map(parseFloat);
    computeRange("spellCount", spellCount, invertSpellCount);
    console.log(tmp);
    const total = await UserWord.find(tmp).count();
    const _words = await UserWord.find(tmp)
      .skip(pageSize * (pageNum - 1))
      .limit(pageSize);
    // console.log(_words, "_words");
    const words = await Word.find({
      word: {
        // $in
        $in: _words.map((w) => w.word),
      },
    });
    // console.log(words);
    res.send({
      total,
      data: words,
    });
  });
  app.use("/api/vocabularies", auth(), router);
};
