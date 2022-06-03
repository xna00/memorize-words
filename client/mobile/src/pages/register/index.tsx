import { getFormData } from "../../tools";
import { route } from "preact-router";
import { axios } from "../../service";

export default () => {
  return (
    <div>
      register
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = getFormData(e);
          console.log(formData);
          axios.post("/api/auth/register", formData).then((res) => {
            console.log(res);
            route("/mobile/login", true);
          });
        }}
      >
        <label htmlFor="">
          username: <input type="text" name="username" required />
        </label>
        <br />
        <label htmlFor="">
          password: <input type="password" name="password" required />
        </label>
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};
