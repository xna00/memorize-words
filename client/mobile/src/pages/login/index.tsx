import { Link, route, useRouter } from "preact-router";
import { axios } from "../../service";

export default () => {
  return (
    <div>
      login
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = Object.fromEntries(new FormData(form));
          axios.post("/api/auth/login", formData).then((res) => {
            console.log(res);
            localStorage.setItem("token", res.data.token);
            route("/mobile", true);
          });
        }}
      >
        <label htmlFor="">
          username: <input type="text" name="username" />
        </label>
        <br />
        <label htmlFor="">
          password: <input type="text" name="password" />
        </label>
        <br />
        <input type="submit" />
      </form>
      <Link href="/mobile/register">register</Link>
    </div>
  );
};
