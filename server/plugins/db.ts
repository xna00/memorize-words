import type { Express} from 'express'
export default (app: Express) => {
  const mongoose = require("mongoose");
  // mongoose.set("useCreateIndex", true);
  mongoose.connect("mongodb://127.0.0.1:27017/memorize-words", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

};
