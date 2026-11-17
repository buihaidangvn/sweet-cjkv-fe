import { JapaneseSearchWordControllerSearchWord200ResponseWordsInner } from "@/app/generated-api";
import { splitMora } from "@/app/helper/split-mora";
import { uniq, uniqBy } from "lodash-es";
import { calculateAccentBorder } from "../util/calculateAccentBorder";

type Props = {
  word: JapaneseSearchWordControllerSearchWord200ResponseWordsInner;
};

export function WordEntry({ word }: Props) {
  return (
    <div className="pb-2">
      <div>
        <b>{word.word}</b>
        <span className="text-sm">
          <span>&nbsp;</span>
          <span className="inline-flex gap-2 w-fit">
            {uniqBy(word.pronunciation, (w) =>
              JSON.stringify([w.accent, w.kana]),
            )?.map((pronunc, pronuncIndex) => (
              <span key={pronuncIndex}>
                {splitMora(pronunc.kana).map((mora, moraIndex) => (
                  <span
                    key={moraIndex}
                    className={calculateAccentBorder(
                      mora,
                      moraIndex,
                      pronunc.accent,
                    )}
                  >
                    {mora}
                  </span>
                ))}
              </span>
            ))}
          </span>
          <span>&nbsp;</span>
          <b>{word.han}</b>
          <span>: </span>
        </span>
        {word.short_mean}
      </div>
      {word.comments?.length && (
        <p>
          &#40;
          <span className="text-blue-600">{word.comments[0].like ?? 0}</span>/
          <span className="text-red-600">{word.comments[0].dislike ?? 0}</span>
          &#41; &nbsp;
          {word.comments[0].mean}
        </p>
      )}
      {word.synsets && (
        <div>
          <span className="italic" title="Synonym / Đồng nghĩa">
            Syn:{" "}
          </span>
          {uniq(
            word.synsets
              .map((synset) => synset.entry)
              .flat()
              .map((entry) => entry?.synonym)
              .flat()
              .filter(Boolean),
          ).join("; ")}
        </div>
      )}

      {word.opposite_word && (
        <div>
          <span className="italic" title="Antonym / Trái nghĩa">
            Ant:{" "}
          </span>
          {word.opposite_word.filter(Boolean).join("; ")}
        </div>
      )}
    </div>
  );
}
