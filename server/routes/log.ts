import express, { Express, Request } from "express";
import Word from "../models/Word";
import type { Word as WordType } from "../../types/models";
import Vocabulary from "../models/Vocabulary";
import auth from "../middleware/auth";
import { minDistance } from "../tools/minDistance";
import LearnLog from "../models/LearnLog";
import UserWord from "../models/UserWord";
import assert from "http-assert";

export default (app: Express) => {
  console.log(Word);
  const router = express.Router();
  router.post("/", async (req: any, res) => {
    console.log(req.body);
    req.body ??= [];
    const ps = (req.body as []).map(async (log) => {
      const { word, type, grade } = log;
      const user = req.user._id;
      const v = await LearnLog.create({ word, type, grade, user });
      const uw = await UserWord.findOne({
        word,
        user,
      });
      assert(uw, 400, `word ${word} not found`);
      if (type === "spell") {
        uw.spellAverageGrade =
          (uw.spellAverageGrade * uw.spellCount + grade) / (uw.spellCount + 1);
        uw.spellCount++;
      } else if (type === "recongize") {
        uw.recongizeAverageGrade =
          (uw.recongizeAverageGrade * uw.recongizeCount + grade) /
          (uw.recongizeCount + 1);
        uw.recongizeCount++;
      }
      uw.averageGrade =
        (uw.averageGrade * uw.learnCount + grade) / (uw.learnCount + 1);
      uw.learnCount++;
      if (!uw.firstlyLearnTime) {
        uw.firstlyLearnTime = new Date();
      }
      await uw.save();
    });

    res.send(await Promise.all(ps));
  });

  router.get("/", async (req, res) => {
    res.send(await LearnLog.find());
  });

  app.use("/api/logs", auth(), router);
};
