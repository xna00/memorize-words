import { Sequelize } from "@sequelize/core";

export const sequelize = new Sequelize(
  "postgres://localhost:5432/memorizeWords",
  {
    // logging: false,
  }
);

export default async () => {
};
