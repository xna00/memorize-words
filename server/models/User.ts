import bcrypt from "bcryptjs";
import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ModelAttributes,
} from "@sequelize/core";
import { sequelize } from "../plugins/db";
import { Word } from "./Word";
import UserWord from "./UserWord";

interface User {
  id: CreationOptional<number>;
  username: string;
  password: string;
  email?: string;
}

interface UserModel
  extends User,
    Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
}

const UserModel = sequelize.define<UserModel>("user", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      console.log(val);
      typeof val === "string" &&
        this.setDataValue("password", bcrypt.hashSync(val, 10));
    },
  },
  email: {
    type: DataTypes.STRING,
  },
});

export default UserModel;
