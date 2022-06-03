import { useEffect, useState } from "preact/compat";
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

  const fetchUserWords = (query: {}) => {
    fetchJSON(
      `/api/userWords?${new URLSearchParams({
        ...query,
        ...page,
      }).toString()}`
    ).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    fetchUserWords({});
  }, [page]);

  return (
    <div class="relative">
      <header class="flex">
        <Filter fetchUserWords={fetchUserWords} />
        <div class="ml-auto">
          total: {data.count} pageSize:{" "}
          <select
            value={page.pageSize}
            onChange={(v) => {
              const limit = (v.target as HTMLSelectElement).value;
              // setPage({
              //   ...page,
              //   limit,
              // });
            }}
          >
            {[10, 20, 30, 50, 100].map((l) => (
              <option value={l}>{l}</option>
            ))}
          </select>
          pageNum:{" "}
          <input
            type="number"
            min={1}
            max={data.count / Number(page.pageSize) + 1}
            value={page.pageNum}
            onChange={(e) => {
              const offset = (e.target as HTMLInputElement).value;
              setPage({ ...page, pageNum: offset });
            }}
          />
        </div>
      </header>
      <ol>
        {data.rows.map((w) => (
          <Word word={w} key={w.id} />
        ))}
      </ol>
    </div>
  );
};
