import mongoose, { Document } from "mongoose";
import type { Word } from "../../types/models";

const schema = new mongoose.Schema<Word & Document>({
  word: { type: String, unique: true },
  phoneticSymbols: {
    uk: { type: String },
    us: { type: String },
  },
  forms: {
    third: { type: String },
    done: { type: String },
    ing: { type: String },
    past: { type: String },
    plural: { type: String },
    noun: { type: String },
    verb: { type: String },
    adverb: { type: String },
    adjective: { type: String },
  },
  senses: [
    {
      form: { type: String },
      chineseExplanation: { type: String },
      englishExplanation: { type: String },
      examples: {
        english: { type: String },
        chinese: { type: String },
        grammer: { type: String },
      },
    },
  ],
  synonym: [{ type: String }],
});

export default mongoose.model("Word", schema);
