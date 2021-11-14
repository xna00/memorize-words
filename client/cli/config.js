module.exports = {
  host: "http://localhost:4000",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzUwYmFiMjU5ZWEzZmZmMjk5M2NmOCIsImlhdCI6MTYzNTA2MDc2OX0.QCVbV5lPgPGKq5CwxnHN31LGNxnOxC59CK85HC8O6qo",
  vocabulary: "6190bbcd0391b731e263198a",
  query: {
    time: ["2021/11/14 16:19:25", "2021/11/14 16:37:25"].map((t) =>
      new Date(t).toISOString()
    ),
    inTimeRange: "",
    pageSize: 1,
    pageNum: 1,
    learnCount: 0,
    // isLearnCount: "",
  },
};
