import express from "express";
import errorHandler from "./middleware/errorHandler";
import db from "./plugins/db";
import auth from "./routes/auth";
import vocabulary from "./routes/vocabulary";
import word from "./routes/word";
import log from "./routes/log";
import userWord from "./routes/userWord";
import QueryString from "qs";

db();

const app = express();
app.set("secret", "jf389u3cosidufq0e3");
app.set("query parser", (q) => QueryString.parse(q));
app.use(express.json({ limit: "25mb" }));

auth(app);
word(app);
userWord(app);
vocabulary(app);
log(app);

app.use(
  "/",
  (req, res, next) => {
    if (req.path === "/" || req.path === "/index.html") {
      res.setHeader("Cache-control", "no-cache");
    }
    next();
  },
  express.static("./client/web/dist")
);

app.use(errorHandler());

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
