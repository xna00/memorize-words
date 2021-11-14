import mongoose, { Document } from "mongoose";
import type { Vocabulary } from "../../types/models";

const schema = new mongoose.Schema<Vocabulary & Document>({
  name: { type: String },
  users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
});

export default mongoose.model("Vocabulary", schema);
