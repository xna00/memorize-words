import { axios } from "../../service";
import { getFormData } from "../../tools";

export default () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = getFormData(e);
        axios
          .post("/api/vocabularies", {
            ...data,
            words: data.words
              .toString()
              .split(/\s/)
              .map((w) => w.trim())
              .filter((w) => w),
          })
          .then((res) => {
            console.log(res);
          });
      }}
    >
      <label>
        name:
        <input type="text" name="name" />
      </label>
      <br />
      <label>
        words:
        <textarea name="words"></textarea>
      </label>
      <br />
      <input type="submit" />
    </form>
  );
};
