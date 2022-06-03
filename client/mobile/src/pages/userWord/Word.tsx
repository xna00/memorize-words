import { useState } from "preact/compat";
import { fetchJSON } from "../../service";
import { ILearnLog, LearnLogType } from "../../types";
import { UserWord } from "./UserWord";

export function Word({ word }: { word: UserWord }) {
  const [userWord, setUserWord] = useState(word);
  const [grade, setGrade] = useState<number>();
  const [visible, setVisible] = useState(false);
  const [logged, setLogged] = useState(false);

  return (
    <li
      // ensure relatedTarget is not null
      tabIndex={1}
      class="flex items-center border-b border-b-orange-100 "
      onBlur={(e) => {
        const { currentTarget: t, relatedTarget: r } = e;
        const currentTarget = t as HTMLLIElement;
        const relatedTarget = r as HTMLElement;
        if (
          [...currentTarget.querySelectorAll("*"), currentTarget].includes(
            relatedTarget
          )
        ) {
          return;
        }
        grade !== undefined &&
          !logged &&
          fetchJSON("/api/logs", {
            method: "post",
            body: JSON.stringify({
              grade,
              type: LearnLogType.Recognize,
              userWordId: userWord.id,
            } as ILearnLog),
            headers: {
              "content-type": "application/json",
            },
          }).then(() => {
            setLogged(true);
            fetchJSON(`/api/userWords/${userWord.word}`).then((res) => {
              setUserWord(res);
            });
          });
      }}
    >
      <div class="overflow-hidden flex-grow">
        <div class="flex items-center">
          <div class="mr-1">
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {userWord.word}
            </a>
          </div>
          <p
            class="text-xs text-ellipsis whitespace-nowrap overflow-hidden"
            hidden={!visible}
            onClick={() => {
              setVisible(false);
            }}
          >
            {userWord.briefExplanation}
          </p>
        </div>
        <div class="text-sm">
          <span class="mr-2">
            {userWord.averageGrade.toFixed(2)}/{userWord.learnCount}
          </span>
          <span>
            {userWord.recognizeAverageGrade.toFixed(2)}/
            {userWord.recognizeCount}
          </span>
        </div>
      </div>
      <div class="flex-shrink-0">
        {[0, 1, 2, 3].map((g) => (
          <button
            class={`w-5 h-5 rounded-full ml-1 border ${
              grade === g
                ? logged
                  ? "border-green-300"
                  : "border-red-300"
                : "border-none"
            }`}
            onClick={() => {
              setVisible(true);
              !logged && setGrade(g);
            }}
            onBlur={(e) => {
              // e.stopPropagation();
            }}
          >
            {g}
          </button>
        ))}
      </div>
    </li>
  );
}
