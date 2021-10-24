import express from "express";
import errorHandler from "./middleware/errorHandler";
import db from "./plugins/db";
import auth from "./routes/auth";
import vocabulary from "./routes/vocabulary";
import word from "./routes/word";

db();

const app = express();
app.set("secret", "jf389u3cosidufq0e3");
app.use(express.json());

auth(app);
word(app);
vocabulary(app);

app.use(errorHandler());

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
