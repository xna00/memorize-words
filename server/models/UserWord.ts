import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ModelAttributes,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasOneGetAssociationMixin,
} from "@sequelize/core";
import { sequelize } from "../plugins/db";
import { ProtoWord } from "./ProtoWord";
import { Word } from "./Word";

interface UserWord {
  id: CreationOptional<number>;
  userId: number;
  word: string;
  briefExplanation?: string;
  spellAverageGrade: CreationOptional<number>;
  spellCount: CreationOptional<number>;
  recongizeCount: CreationOptional<number>;
  recongizeAverageGrade: CreationOptional<number>;
  learnCount: CreationOptional<number>;
  averageGrade: CreationOptional<number>;
  firstlyLearnTime?: CreationOptional<Date>;
  getWord: HasOneGetAssociationMixin<Word>;
}

export interface UserWordModel
  extends UserWord,
    Model<
      InferAttributes<UserWordModel>,
      InferCreationAttributes<UserWordModel>
    > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
}

const M = sequelize.define<UserWordModel>(
  "userWord",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    word: {
      type: DataTypes.STRING,
    },
    briefExplanation: {
      type: DataTypes.VIRTUAL,
    },
    spellAverageGrade: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    spellCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    recongizeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    recongizeAverageGrade: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    learnCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    averageGrade: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    firstlyLearnTime: {
      type: DataTypes.DATE,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "word"],
      },
    ],
  }
);

export default M;
