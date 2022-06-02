import { ProtoWord } from "./ProtoWord";
import { Word } from "./Word";
import User from "./User";
import Vocabulary from "./Vocabulary";
import UserWord from "./UserWord";
import { sequelize } from "../plugins/db";
import VocabularyUserWord from "./VocabularyUserWord";
import LearnLog from "./LearnLog";

export { User, ProtoWord, Word, Vocabulary, UserWord, VocabularyUserWord };

ProtoWord.hasMany(Word, {
  foreignKey: "linkTo",
  as: "proto",
  constraints: false,
});
Word.belongsTo(ProtoWord, {
  foreignKey: "linkTo",
  as: "proto",
  constraints: false,
});

User.hasMany(UserWord, {
  foreignKey: "userId",
});
UserWord.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(LearnLog, {
  foreignKey: "userId",
});
LearnLog.belongsTo(User, {
  foreignKey: "userId",
});

UserWord.hasMany(LearnLog, {
  foreignKey: "userWordId",
});
LearnLog.belongsTo(UserWord, {
  foreignKey: "userWordId",
});

Word.hasMany(UserWord, {
  foreignKey: "word",
});
UserWord.belongsTo(Word, {
  foreignKey: "word",
});

User.hasMany(Vocabulary, {
  foreignKey: "userId",
});
Vocabulary.belongsTo(User, {
  foreignKey: "userId",
});

UserWord.belongsToMany(Vocabulary, {
  through: VocabularyUserWord,
});
Vocabulary.belongsToMany(UserWord, {
  through: VocabularyUserWord,
});

ProtoWord.sync({ alter: true })
  .then(() => Word.sync({ alter: true }))
  .then(() => User.sync({ alter: true }))
  .then(() => UserWord.sync({ alter: true }))
  .then(() => Vocabulary.sync({ alter: true }))
  .then(() => VocabularyUserWord.sync({ alter: true }))
  .then(() => LearnLog.sync({ alter: true }));

// sequelize.sync({ alter: true });
