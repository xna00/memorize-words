import express, { Express } from "express";
import { User } from "../models";
import jwt from "jsonwebtoken";
import assert = require("http-assert");
import errorHandler from "../middleware/errorHandler";

export default (app: Express) => {
  const router = express.Router();

  router.use(errorHandler());
  router.post("/register", async (req, res) => {
    console.log(req.body)
    const newUser = await User.create(req.body);
    res.send(newUser);
  });

  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });
    assert(user, 422, "用户不存在");
    const isValid = require("bcryptjs").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");
    const token = jwt.sign({ id: user.id }, app.get("secret"));
    res.send({ token, id: user.id });
  });

  app.use("/api/auth", router);
};
