import { exec, execSync } from "child_process";
import fs from "fs";

export function play(word: string): void {
  if (!fs.existsSync(`/tmp/${word}`))
    exec(
      `wget http://ssl.gstatic.com/dictionary/static/sounds/oxford/${word}--_us_1.mp3 -O /tmp/${word} -q`,
      () => {
        exec(`afplay /tmp/${word}`);
      }
    );
  else {
    exec(`afplay /tmp/${word}`);
  }
}
