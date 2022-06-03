import { Router, Route, Link } from "preact-router";
export default () => {
  return (
    <div>
      <Link href={"/mobile/userWords"}>userWords</Link>
      <br />
      <Link href="/mobile/import">import</Link>
      <br />
      <Link href={"/mobile/login"}>login</Link>
    </div>
  );
};
