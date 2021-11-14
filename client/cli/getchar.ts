const map: Record<string, string> = {
  "\r": "\n",
};
export function getChar(): Promise<string> {
  const stdin = process.stdin;

  // without this, we would only get streams once enter is pressed
  stdin.setRawMode(true);

  // resume stdin in the parent process (node app won't quit all by itself
  // unless an error or process.exit() happens)
  // stdin.resume();

  // i don't want binary, do you?
  stdin.setEncoding("utf8");
  return new Promise((resolve) => {
    const listener = function (_key: any) {
      let key: string = _key.toString();
      // ctrl-c ( end of text )
      if (key === "\u0003") {
        console.clear();
        process.exit();
      }
      key = map[key] || key;
      if (key.charCodeAt(0) === 127) {
        key = "\b \b";
        resolve("\b");
      } else {
        resolve(key);
      }

      // write the key to stdout all normal like
      process.stdout.write(key);
      stdin.removeListener("data", listener);
      stdin.setRawMode(false);
      //   console.log(key);
    };
    stdin.on("data", listener);
  });
}
