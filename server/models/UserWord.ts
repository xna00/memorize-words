import mongoose, { Document } from "mongoose";
import type { Vocabulary } from "../../types/models";

const schema = new mongoose.Schema<
  Document & {
    spellAverageGrade: number;
    spellCount: number;
    recongizeCount: number;
    recongizeAverageGrade: number;
    learnCount: number;
    averageGrade: number;
    firstlyLearnTime: Date;
    word: string;
    user: any;
    in: any[];
  }
>(
  {
    word: { type: String, ref: "Word" },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    spellCount: { type: Number, default: 0 },
    spellAverageGrade: { type: Number, default: 0 },
    recongizeCount: { type: Number, default: 0 },
    recongizeAverageGrade: { type: Number, default: 0 },
    learnCount: { type: Number, default: 0 },
    averageGrade: { type: Number, default: 0 },
    firstlyLearnTime: Date,
    in: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Vocabulary" }],
  },
  { timestamps: true }
);

export default mongoose.model("UserWord", schema);
