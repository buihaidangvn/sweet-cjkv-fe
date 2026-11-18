import { JapaneseSearchWordControllerSearchWord200ResponseWordsInner } from "@/app/generated-api";
import { splitMora } from "@/app/helper/split-mora";
import { uniq, uniqBy } from "lodash-es";
import { calculateAccentBorder } from "../util/calculateAccentBorder";
import React from "react";
import { ClickableWordList } from "./ClickableWordList";

type Props = {
  word: JapaneseSearchWordControllerSearchWord200ResponseWordsInner;
  onWordClick: (value: string) => void;
};

export function WordEntry({ word, onWordClick }: Props) {
  return (
    <div className="pb-2">
      {/* line 1 */}
      <div>
        {/* chữ nhật */}
        {word.word && <b>{word.word}</b>}

        {/* hán việt */}
        {word.han && (
          <>
            <span> </span>
            <b className="text-sm">{word.han}</b>
          </>
        )}

        {/* phát âm list */}
        {word.pronunciation?.length && (
          <>
            <span> </span>
            <span className="inline-flex gap-2 w-fit text-sm">
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
          </>
        )}

        {/* nghĩa tiếng việt */}
        {word.short_mean && (
          <>
            <span> : </span>
            <span>{word.short_mean}</span>
          </>
        )}
      </div>
      {/* end of line 1 */}

      {/* line 2 */}
      {word.comments?.length && (
        <div>
          &#40;
          <span className="text-blue-600">{word.comments[0].like ?? 0}</span>/
          <span className="text-red-600">{word.comments[0].dislike ?? 0}</span>
          &#41; {word.comments[0].mean}
        </div>
      )}

      {/* line 3 */}
      {word.synsets && (
        <div>
          <span className="italic text-blue-600" title="Synonym / Đồng nghĩa">
            Syn:&nbsp;
          </span>
          <ClickableWordList
            entries={word.synsets
              .map((synset) => synset.entry)
              .flat()
              .map((entry) => entry?.synonym)
              .flat()
              .filter((w) => w !== undefined)
              .map((w) => ({
                word: w,
              }))}
            onWordClick={onWordClick}
          />
        </div>
      )}

      {/* line 4 */}
      {word.opposite_word && (
        <div>
          <span className="italic text-red-600" title="Antonym / Trái nghĩa">
            Ant:&nbsp;
          </span>
          <ClickableWordList
            entries={word.opposite_word
              .filter((w) => w !== undefined)
              .map((w) => ({
                word: w,
              }))}
            onWordClick={onWordClick}
          />
        </div>
      )}
    </div>
  );
}
