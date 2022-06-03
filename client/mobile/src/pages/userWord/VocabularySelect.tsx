import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";
import { fetchJSON } from "../../service";
export interface Vocabulary {
  id: number;
  name: string;
  userId: number;
}
export default (props: JSX.IntrinsicElements["select"]) => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);

  useEffect(() => {
    fetchJSON("/api/vocabularies").then((res) => {
      setVocabularies(res);
    });
  }, []);

  return (
    <select {...props}>
      {vocabularies.map((v) => (
        <option value={v.id}>{v.name}</option>
      ))}
    </select>
  );
};
