import {
  createLog,
  createVocabulary,
  getVocabularies,
  getVocabulary,
} from "./api";
import { getChar } from "./getchar";
import { play } from "./tools";
import tty from "tty";
import { readFileSync, readSync } from "fs";

const { vocabulary: id, query } = require("./config.js");
console.clear();

async function main() {
  let vocabulardy = await (await getVocabulary(id, query)).data;
  let index = 0;
  const setIndex = async (newIndex: number): Promise<void> => {
    if (newIndex < 0) {
      index = vocabulardy.length - 1;
    } else if (newIndex >= vocabulardy.length) {
      query.pageNum = (query.pageNum || 1) + 1;
      vocabulardy = await (await getVocabulary(id, query)).data;
      index = 0;
    } else index = newIndex;
  };
  while (true) {
    const w = vocabulardy[index];
    const word = w.word;
    console.clear();
    console.log(`${index + 1}/${vocabulardy.length}`);
    console.log("\n");
    console.log(w.phoneticSymbols);
    console.log(w.senses?.map((s) => `${s.chineseExplanation}`).join("\n"));
    new tty.WriteStream(0).cursorTo(0, 1);
    play(w.word);
    let input = "";
    while (input !== w.word) {
      const c = await getChar();
      if (c === "\b") {
        input = input.slice(0, -1);
      } else if (c === "\n") input = "";
      else if (c === "?") break;
      else input += c;
      //   console.log(input);
    }
    if (input === word) {
      console.log("\nYou are right!");
      await createLog({
        word: w.word,
        type: "spell",
        grade: 3,
      });
    } else {
      console.log(word);
      await createLog({
        word,
        type: "spell",
        grade: 0,
      });
    }
    while (true) {
      const c = await getChar();
      console.log(c);
      if (c === "j") {
        await setIndex(index + 1);
        break;
      } else if (c === "k") {
        await setIndex(index - 1);
        break;
      } else if (c === ".") {
        break;
      }
    }
    //   console.log(c === '\n')
    // console.clear();
    // console.log(c);
  }
}

if (process.argv.includes("cv")) {
  const argv = process.argv;
  const index = argv.findIndex((v) => v === "cv");
  const name = argv[index + 1];
  const words = readFileSync(argv[index + 2], { encoding: "utf-8" })
    .split("\n")
    .map((w) => w.trim())
    .filter((w) => w);
  createVocabulary({
    name,
    words,
  }).then((res) => {
    console.log(res);
  });
} else {
  main();
}
// main();
