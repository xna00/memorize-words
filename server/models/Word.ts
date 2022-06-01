import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "@sequelize/core";
import { sequelize } from "../plugins/db";
import { ProtoWord } from "./ProtoWord";

// order of InferAttributes & InferCreationAttributes is important.
export class Word extends Model<
  InferAttributes<Word>,
  InferCreationAttributes<Word>
> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare word: string;
  declare phoneticSymobles?: {
    us?: string;
    uk?: string;
  };
  declare linkTo: string;

  declare proto?: NonAttribute<ProtoWord>;
  // other attributes...
}

Word.init(
  {
    word: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    phoneticSymobles: {
      type: DataTypes.JSONB,
    },
    linkTo: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "words",
    timestamps: false,
  }
);

Word.sync({ alter: true });
