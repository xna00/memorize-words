export enum LearnLogType {
  Recognize = "0",
  Spell = "1",
}

export enum LearnLogGrade {
  不认识 = 0,
  不确定 = 1,
  想起来了 = 2,
  认识 = 3,
}
export interface ILearnLog {
  id: number;
  userId: number;
  userWordId: number;
  type: LearnLogType;
  grade: LearnLogGrade;
}
