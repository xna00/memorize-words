import mongoose, { Document } from "mongoose";

// const schema = new mongoose.Schema<//   {
// //     word: string;
// //     type: "recognize" | "spell";
// //     // 3-认识， 2-想起来了， 1-不确定， 0-不认识
// //     grade: 0 | 1 | 2 | 3;
// //     // user: string;
// //   } & Document
// any>(
//   {
//     word: { type: String },
//     user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
//     type: { type: String },
//     grade: { type: Number },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("LearnLog", schema);

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "@sequelize/core";
import { sequelize } from "../plugins/db";
import { ProtoWord } from "./ProtoWord";
import { Word } from "./Word";

export enum LearnLogType {
  Recognize = "0",
  Spell = "1",
}

export enum LearnLogGrade {
  不认识 = 0,
  不确定 = 1,
  想起来了 = 2,
  认识 = 3,
}

export interface ILearnLog {
  id: CreationOptional<number>;
  userId: number;
  userWordId: number;
  type: LearnLogType;
  grade: LearnLogGrade;
}

export interface LearnLogModel
  extends ILearnLog,
    Model<
      InferAttributes<LearnLogModel>,
      InferCreationAttributes<LearnLogModel>
    > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
}

const M = sequelize.define<LearnLogModel>("learnLog", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userWordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default M;
