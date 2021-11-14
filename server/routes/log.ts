import express, { Express, Request } from "express";
import Word from "../models/Word";
import type { Word as WordType } from "../../types/models";
import Vocabulary from "../models/Vocabulary";
import auth from "../middleware/auth";
import { minDistance } from "../tools/minDistance";
import LearnLog from "../models/LearnLog";
import UserWord from "../models/UserWord";

export default (app: Express) => {
  console.log(Word);
  const router = express.Router();
  router.post("/", async (req: any, res) => {
    console.log(req.body);
    const { word, type, grade } = req.body;
    const user = req.user._id;
    const v = await LearnLog.create({ word, type, grade, user });
    const uw = await UserWord.findOne({
      word,
      user,
    });
    if (!uw) return;
    uw.averageGrade =
      (uw.averageGrade * uw.learnCount + grade) / (uw.learnCount + 1);
    uw.learnCount++;
    uw.save();
    res.send(v);
  });

  router.get("/", async (req, res) => {
    res.send(await LearnLog.find());
  });

  app.use("/api/logs", auth(), router);
};
