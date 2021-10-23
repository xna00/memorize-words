import express from "express";
import db from "./plugins/db";
import word from "./routes/word";

db();

const app = express();

word(app);

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
