import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../plugins/db";
import { Word } from "./Word";

type A = InferAttributes<ProtoWord>;
// order of InferAttributes & InferCreationAttributes is important.
export class ProtoWord extends Model<
  InferAttributes<ProtoWord>,
  InferCreationAttributes<ProtoWord>
> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare word: string;
  declare forms?: {
    third?: string;
    done?: string;
    ing?: string;
    past?: string;
    plural?: string;
    noun?: string;
    verb?: string;
    adverb?: string;
    adjective?: string;
    comparative?: string;
    superlative?: string;
  };
  declare senses?: {
    form?: string;
    chineseExplanation?: string;
    englishExplanation?: string;
    tips?: string[];
    examples?: {
      english?: string;
      chinese?: string;
      grammar?: string;
    }[];
    synonym?: string[];
  }[];
  // other attributes...
}

ProtoWord.init(
  {
    word: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    forms: {
      type: DataTypes.JSONB,
    },
    senses: {
      type: DataTypes.JSONB,
    },
  },
  {
    sequelize,
    tableName: "protoWords",
    timestamps: false,
  }
);
