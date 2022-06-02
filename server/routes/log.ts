import express, { Express, Request } from "express";
import { Word } from "../models/Word";
import type { Word as WordType } from "../../types/models";
import Vocabulary from "../models/Vocabulary";
import auth from "../middleware/auth";
import { minDistance } from "../tools/minDistance";
import LearnLog, {
  ILearnLog,
  LearnLogGrade,
  LearnLogType,
} from "../models/LearnLog";
import UserWord from "../models/UserWord";
import assert from "http-assert";
import { User } from "../models";
import { queryTowhere } from "../tools/query";

export default (app: Express) => {
  console.log(Word);
  const router = express.Router();
  router.post("/", async (req: any, res) => {
    const { userWordId, type, grade } = req.body as ILearnLog;
    const user = (req as any).user as User;
    const userWord = await UserWord.findByPk(userWordId);
    assert(userWord, 400, "userWord not exists");
    assert(userWord.userId === user.id, 403, "forbidden");

    const ret = await LearnLog.create({
      userId: user.id,
      userWordId,
      grade,
      type,
    });

    if (type === LearnLogType.Recognize) {
      const { recongizeAverageGrade, recongizeCount } = userWord;
      userWord.recongizeAverageGrade =
        (recongizeAverageGrade * recongizeCount + grade) / (recongizeCount + 1);
      userWord.recongizeCount++;
    } else {
      const { spellAverageGrade, spellCount } = userWord;
      userWord.spellAverageGrade =
        (spellAverageGrade * spellCount + grade) / (spellCount + 1);

      userWord.spellCount++;
    }

    const { averageGrade, learnCount } = userWord;
    userWord.averageGrade = (averageGrade * learnCount) / (learnCount + 1);
    userWord.learnCount = userWord.spellCount + userWord.recongizeCount;
    await userWord.save();

    res.send(ret);
  });

  router.get("/", async (req, res) => {
    const user = (req as any).user as User;
    const query = req.query as any;
    res.send(
      await LearnLog.findAll({
        where: {
          userId: user.id,
          ...queryTowhere({ ...query }),
        },
      })
    );
  });

  app.use("/api/logs", auth(), router);
};
