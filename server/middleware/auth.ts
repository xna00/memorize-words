import { User } from "../models";
import assert from "http-assert";
import jwt from "jsonwebtoken";
export default (options?) => {
  return async (req, res, next) => {
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    assert(token, 401, "请先登录");
    const tmp = jwt.verify(token, req.app.get("secret"));
    assert(typeof tmp !== "string", 500);
    const { id } = tmp;
    assert(id, 401, "请先登录");
    req.user = await User.findByPk(id);
    assert(req.user, 401, "请先登录");
    await next();
  };
};
