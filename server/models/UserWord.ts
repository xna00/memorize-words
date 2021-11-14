import mongoose, { Document } from "mongoose";
import type { Vocabulary } from "../../types/models";

const schema = new mongoose.Schema<
  Document & {
    averageGrade: number;
    learnCount: number;
    word: string;
    user: any;
    in: any[];
  }
>(
  {
    word: { type: String, ref: "Word" },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    learnCount: { type: Number, default: 0 },
    averageGrade: { type: Number, default: 0 },
    in: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Vocabulary" }],
  },
  { timestamps: true }
);

export default mongoose.model("UserWord", schema);
