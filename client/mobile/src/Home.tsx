import { Router, Route, Link } from "preact-router";
export default () => {
  return (
    <div>
      <Link href={"/mobile/userWords"}>userWords</Link>
      <Link href={"/mobile/login"}>login</Link>
    </div>
  );
};
