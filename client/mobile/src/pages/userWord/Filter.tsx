import { useState } from "preact/hooks";
import VocabularySelect from "./VocabularySelect";

export default ({ fetchUserWords }: { fetchUserWords: (q: {}) => void }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        筛选
      </button>
      <aside
        class={`w-100vw h-100vh fixed  top-0 transition-transform bg-opacity-80 ${
          visible ? "bg-gray-200" : "-translate-x-full "
        }`}
        onClick={() => {
          setVisible(false);
        }}
      >
        <div
          class="w-9/12 bg-white h-full"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = Object.fromEntries(
                new FormData(e.target as HTMLFormElement)
              );
              fetchUserWords(formData);
              console.log(formData);
            }}
          >
            <label>
              vocabulary:
              <VocabularySelect name="vocabulary" class="" />
            </label>
            <br />
            <label>
              recogizeAverage:
              <input
                type="number"
                name="recognizeAverageGrade[0]"
                min={-0.1}
                max={3}
                step={0.1}
              />
              -
              <input
                type="number"
                name="recognizeAverageGrade[1]"
                min={0}
                max={3}
                step={0.1}
              />
            </label>
            <br />
            <input type="submit" />
          </form>
        </div>
      </aside>
    </div>
  );
};
