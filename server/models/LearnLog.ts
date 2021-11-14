import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema<//   {
//     word: string;
//     type: "recognize" | "spell";
//     // 3-认识， 2-想起来了， 1-不确定， 0-不认识
//     grade: 0 | 1 | 2 | 3;
//     // user: string;
//   } & Document
any>(
  {
    word: { type: String },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    type: { type: String },
    grade: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("LearnLog", schema);
