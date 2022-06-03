import { useEffect, useRef, useState } from "preact/hooks";
import Drawer from "../../components/Drawer";
import VocabularySelect from "./VocabularySelect";

export default ({ fetchUserWords }: { fetchUserWords: (q: {}) => void }) => {
  const [visible, setVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    const formDataS = localStorage.getItem("formData");
    if (form && formDataS) {
      const formData = JSON.parse(formDataS);
      Object.entries(formData).forEach(([k, v]) => {
        const tmp = form.elements.namedItem(k) as any;
        tmp && (tmp.value = v);
      });
    }
  }, [formRef]);

  return (
    <div>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        筛选
      </button>
      <Drawer visible={visible} onClose={() => setVisible(false)}>
        <div
          class="w-9/12 h-full bg-white flex flex-col justify-between"
          onClick={(e) => {}}
        >
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = Object.fromEntries(
                new FormData(e.target as HTMLFormElement)
              );
              localStorage.setItem("formData", JSON.stringify(formData));
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
                required
                min={-0.1}
                max={3}
                step={0.1}
              />
              -
              <input
                type="number"
                name="recognizeAverageGrade[1]"
                required
                min={0}
                max={3}
                step={0.1}
              />
            </label>
            <br />
            <input type="submit" />
          </form>
        </div>
      </Drawer>
      {/* <aside
        class={`w-100vw h-100vh fixed  top-0 transition-all ease-linear duration-200 bg-black ${
          visible
            ? // bg or inset box-shadow
              "translate-x-0 bg-opacity-60"
            : "-translate-x-full bg-opacity-0"
        }`}
        style={{
          boxShadow: visible
            ? "rgb(0 0 0 / 60%) 0 0 0 10000px"
            : "rgb(0 0 0 / 0%) 0 0 0 10000px",
        }}
        onClick={() => {
          setVisible(false);
        }}
      ></aside> */}
    </div>
  );
};
