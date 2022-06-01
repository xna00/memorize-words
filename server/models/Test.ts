import {
  Sequelize,
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "@sequelize/core";
import { sequelize } from "../plugins/db";

// const sequelize = new Sequelize("mysql://root:asd123@localhost:3306/mydb");

// We recommend you declare an interface for the attributes, for stricter typechecking

interface User {
  id: CreationOptional<number>;
  name: string;
}

interface UserModel
  extends User,
    Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
}

const UserModel = sequelize.define<UserModel>("User", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  name: {
    type: DataTypes.STRING,
  },
});

async function doStuff() {
  const instance = await UserModel.findByPk(1, {
    rejectOnEmpty: true,
  });
  instance.id;

  console.log(instance.id);
}
