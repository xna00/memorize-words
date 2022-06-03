import { useEffect, useState } from "preact/hooks";
import { axios } from "../service";

export default ({ word }: { word: string }) => {
  const [wordDetail, setWordDetail] = useState();
  useEffect(() => {
    axios.get(`/api/words/${word}`).then((res) => {
      setWordDetail(res.data);
    });
  }, [word]);
  return (
    <div>
      <code>{JSON.stringify(wordDetail, null, 2)}</code>
    </div>
  );
};
