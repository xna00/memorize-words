import express, { Express } from "express";
import type { Request } from "express";
import { Word } from "../models/Word";
import { ProtoWord, User, Vocabulary, VocabularyUserWord } from "../models";
import auth from "../middleware/auth";
import UserWord from "../models/UserWord";
import assert from "http-assert";

export default (app: Express) => {
  console.log(Word);
  const router = express.Router();
  router.get("/", async (req, res) => {
    const user = (req as any).user as User;
    const { vocabulary } = req.query as { vocabulary?: string };

    if (vocabulary) {
      const words = await Vocabulary.findOne({
        where: {
          userId: user.id,
          id: vocabulary,
        },
        include: {
          all: true,
        },
      });
      assert(words, 400, "Your vocabulary was not found!");
      console.log("wods", words);
      res.send(words);
      return;
    }
    const words = await UserWord.findAndCountAll({
      where: {
        userId: user.id,
      },
      attributes: {
        exclude: ["id", "userId"],
        // include: ['briefExplantion']
      },

      limit: 20,
      offset: 0,
    });
    await Promise.all(
      words.rows.map(async (w) => {
        const word = await w.getWord({
          include: {
            model: ProtoWord,
            as: "proto",
          },
        });

        w.briefExplanation = word.proto?.senses
          ?.map((s) => s.chineseExplanation)
          .join("；");
        // console.log((word as any).getProto);
      })
    );
    res.send(words);
  });
  app.use("/api/userWord", auth(), router);
};
