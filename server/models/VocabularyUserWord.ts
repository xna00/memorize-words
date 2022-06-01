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
} from "@sequelize/core";
import { sequelize } from "../plugins/db";
import { User, UserWord } from ".";
import { UserWordModel } from "./UserWord";

interface V {
  vocabularyId: number;
  userWordId: number;
}

interface VocabularyUserWordModel
  extends V,
    Model<
      InferAttributes<VocabularyUserWordModel>,
      InferCreationAttributes<VocabularyUserWordModel>
    > {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
}

const M = sequelize.define<VocabularyUserWordModel>("vocabularyUserWord", {
  vocabularyId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  userWordId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

export default M;
