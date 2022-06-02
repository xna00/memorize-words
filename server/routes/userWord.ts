import express, { Express, Response } from "express";
import { Word } from "../models/Word";
import { ProtoWord, User, Vocabulary, VocabularyUserWord } from "../models";
import auth from "../middleware/auth";
import UserWord, { UserWordModel } from "../models/UserWord";
import { Op } from "@sequelize/core";
import assert from "http-assert";
import { queryTowhere } from "../tools/query";

export default (app: Express) => {
  console.log(Word);
  const router = express.Router();

  type A = { count: number; rows: UserWordModel[] };
  router.get("/", async (req, res: Response<A>) => {
    const user = (req as any).user as User;
    const { vocabulary, limit, offset, ...rest } = req.query as {
      vocabulary?: string;
      limit?: number;
      offset?: number;
    };
    console.log(rest, queryTowhere({ ...rest }));
    let resp: A;

    let ids: number[] | undefined;
    if (vocabulary) {
      const t = await Vocabulary.findOne({
        where: {
          id: vocabulary,
          userId: user.id,
        },
        include: UserWord,
      });
      assert(t, 400, "Your vocabulary was not found!");
      ids = (t.userWords ?? []).map((w) => w.id);
    }

    resp = await UserWord.findAndCountAll({
      where: {
        userId: user.id,
        id: ids ?? {
          [Op.gt]: -1,
        },
        ...queryTowhere({
          ...rest,
        }),
      },
      attributes: {
        exclude: ["id", "userId"],
      },
      limit,
      offset,
    });
    // }
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

  router.get("/:word", async (req, res) => {
    const user = (req as any).user as User;
    const { word } = req.params;
    res.send(
      await UserWord.findOne({
        where: {
          userId: user.id,
          word: word,
        },
      })
    );
  });

  app.use("/api/userWords", auth(), router);
};
