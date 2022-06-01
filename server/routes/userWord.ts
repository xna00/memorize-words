import express, { Express, Response } from "express";
import type { Request } from "express";
import { Word } from "../models/Word";
import { ProtoWord, User, Vocabulary, VocabularyUserWord } from "../models";
import auth from "../middleware/auth";
import UserWord, { UserWordModel } from "../models/UserWord";
import assert from "http-assert";

export default (app: Express) => {
  console.log(Word);
  const router = express.Router();

  type A = { count: number; rows: UserWordModel[] };
  router.get("/", async (req, res: Response<A>) => {
    const user = (req as any).user as User;
    const { vocabulary, ...page } = req.query as {
      vocabulary?: string;
      limit?: number;
      offset?: number;
    };
    let resp: A;
    if (vocabulary) {
      const w = await Vocabulary.findOne({
        where: {
          userId: user.id,
          id: vocabulary,
        },
      });
      assert(w, 400, "Your vocabulary was not found!");

      console.log(31);
      const t = await w.getUserWords({
        ...page,
        joinTableAttributes: [],
        attributes: {
          exclude: ["id", "userId"],
        },
      });
      resp = {
        count: await w.countUserWords(),
        rows: t,
      };
    } else {
      resp = await UserWord.findAndCountAll({
        where: {
          userId: user.id,
        },
        attributes: {
          exclude: ["id", "userId"],
        },
      });
    }
    await Promise.all(
      resp.rows.map(async (w) => {
        const word = await w.getWord({
          include: {
            model: ProtoWord,
            as: "proto",
          },
        });

        w.briefExplanation = word.proto?.senses
          ?.map((s) => s.chineseExplanation)
          .join("；");
      })
    );
    res.send(resp);
  });
  app.use("/api/userWord", auth(), router);
};
