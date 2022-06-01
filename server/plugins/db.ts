import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://localhost:5432/memorizeWords",
  {
    // logging: false,
  }
);

export default async () => {
};
