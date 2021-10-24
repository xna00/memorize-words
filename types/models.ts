export type Word = {
  word: string;
  phoneticSymbols: {
    uk?: string;
    us?: string;
  };
  forms?: {
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
  senses?: {
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
};
export type User = {
  username: string;
  email?: string;
  password: string;
};
export type Vocabulary = {
  name: string;
  users: User[];
  words: string[];
  _id: string;
};
export type LearnLog = {
  user: User;
  grade: number;
  timestamp: string;
};
export type SpellLog = {
  user: User;
  grade: "right" | "wrong";
  timestamp: string;
};
