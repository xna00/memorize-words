import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ModelAttributes,
  Association,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyCountAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
} from "@sequelize/core";
import { sequelize } from "../plugins/db";
import { User, UserWord } from ".";
import { UserWordModel } from "./UserWord";

interface Vocabulary {
  id: CreationOptional<number>;
  name: string;
  userId: number;
  userWords?: UserWordModel[];
  getUserWords: BelongsToManyGetAssociationsMixin<UserWordModel>;
  countUserWords: BelongsToManyCountAssociationsMixin;
}

interface VocabularyModel
  extends Vocabulary,
    Model<
      InferAttributes<VocabularyModel>,
      InferCreationAttributes<VocabularyModel>
    > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
}

const M = sequelize.define<VocabularyModel>("vocabulary", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default M;
