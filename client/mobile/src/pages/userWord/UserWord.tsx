import { useEffect, useState } from "preact/compat";
import Drawer from "../../components/Drawer";
import WordDetail from "../../components/WordDetail";
import { fetchJSON } from "../../service";
import { stringify } from "../../tools";
import Filter from "./Filter";
import VocabularySelect from "./VocabularySelect";
import { Word } from "./Word";

export interface UserWord {
  id: number;
  userId: number;
  word: string;
  briefExplanation: string;
  spellAverageGrade: number;
  spellCount: number;
  recognizeCount: number;
  recognizeAverageGrade: number;
  learnCount: number;
  averageGrade: number;
  firstlyLearnTime?: string;
}

export default () => {
  const [page, setPage] = useState({ pageSize: "10", pageNum: "1" });
  const [data, setData] = useState<{ count: 0; rows: UserWord[] }>({
    count: 0,
    rows: [],
  });
  const [where, setWhere] = useState({});
  const [word, setWord] = useState<string>();
  const [visible, setVisible] = useState(false);
  const pageCount = Math.ceil(data.count / Number(page.pageSize));

  useEffect(() => {
    fetchJSON(
      `/api/userWords?${new URLSearchParams({
        ...where,
        ...page,
      }).toString()}`
    ).then((res) => {
      setData(res);
    });
  }, [page, where]);

  return (
    <div class="relative">
      <header class="flex">
        <Filter fetchUserWords={setWhere} />
        <div class="ml-auto">
          total: {data.count} pageSize:{" "}
          <select
            value={page.pageSize}
            onChange={(v) => {
              const limit = (v.target as HTMLSelectElement).value;
              setPage({
                ...page,
                pageSize: limit,
              });
            }}
          >
            {[10, 20, 30, 50, 100].map((l) => (
              <option value={l}>{l}</option>
            ))}
          </select>
          pageNum:
          <button
            class="w-4"
            disabled={page.pageNum === "1"}
            onClick={() => {
              setPage({
                ...page,
                pageNum: (Number(page.pageNum) - 1).toString(),
              });
            }}
          >
            ↑
          </button>
          <input
            type="number"
            min={1}
            max={pageCount}
            step={1}
            value={page.pageNum}
            onChange={(e) => {
              const offset = (e.target as HTMLInputElement).value;
              setPage({ ...page, pageNum: offset });
            }}
          />
          /{pageCount}
          <button
            class="w-4"
            disabled={page.pageNum === pageCount.toString()}
            onClick={() => {
              setPage({
                ...page,
                pageNum: (Number(page.pageNum) + 1).toString(),
              });
            }}
          >
            ↓
          </button>
        </div>
      </header>
      <ol>
        {data.rows.map((w) => (
          <Word
            word={w}
            key={w.id}
            setWord={setWord}
            setDVisible={setVisible}
          />
        ))}
      </ol>
      <Drawer
        placement="right"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <div class="bg-white w-9/12 overflow-auto">
          {word && <WordDetail word={word} />}
        </div>
      </Drawer>
    </div>
  );
};
