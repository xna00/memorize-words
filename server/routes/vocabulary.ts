import express, { Express } from "express";
import type { Request } from "express";
import { Word } from "../models/Word";
import { User, Vocabulary, VocabularyUserWord } from "../models";
import auth from "../middleware/auth";
import UserWord from "../models/UserWord";

export default (app: Express) => {
  console.log(Word);
  const router = express.Router();
  router.post(
    "/",
    async (req: Request<{}, any, { words: string[]; name: string }>, res) => {
      req.query;
      console.log(req.body);
      const { words, name } = req.body;
      console.log(words, name);
      const user = (req as any).user as User;

      const tmp = (
        await UserWord.findAll({
          where: {
            word: words,
          },
        })
      ).map((t) => t.word);

      const allWords = (await Word.findAll()).map((w) => w.word);

      await UserWord.bulkCreate(
        words
          .filter((w) => !tmp.includes(w) && allWords.includes(w))
          .map((w) => ({
            userId: user.id,
            word: w,
          }))
      );

      const v = await Vocabulary.create({
        name,
        userId: user.id,
      });

      await VocabularyUserWord.bulkCreate(
        (
          await UserWord.findAll({
            where: {
              word: words,
            },
          })
        ).map((w) => ({
          vocabularyId: v.id,
          userWordId: w.id,
        }))
      );

      res.send(v);
    }
  );
  // router.delete("/:vocabulary/:word", async (req, res) => {
  //   const { vocabulary, word } = req.params;
  //   res.send(
  //     await UserWord.findOneAndDelete({
  //       word,
  //       in: vocabulary,
  //     })
  //   );
  // });

  router.get("/", (req: any, res) => {
    const user = (req as any).user as User;
    Vocabulary.findAll({
      where: {
        userId: user.id,
      },
    }).then((r) => {
      res.send(r);
    });
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    res.send(
      await Vocabulary.findOne({
        where: {
          id,
        },
      })
    );
  });

  app.use("/api/vocabularies", auth(), router);
};
