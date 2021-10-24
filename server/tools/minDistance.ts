export function minDistance(word1: string, word2: string): number {
  if (word1.length < word2.length) return minDistance(word2, word1);
  const dp: number[] = new Array(word2.length + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= word1.length; i++) {
    let p1 = dp[0];
    dp[0] = i;
    for (let j = 1; j <= word2.length; j++) {
      let tmp = dp[j];
      dp[j] =
        Math.min(
          dp[j],
          dp[j - 1],
          p1 + (word1[i - 1] === word2[j - 1] ? -1 : 0)
        ) + 1;
      p1 = tmp;
    }
  }

  return dp[word2.length];
}
