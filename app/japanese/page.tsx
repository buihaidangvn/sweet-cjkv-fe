"use client";

import { useEffect, useState } from "react";
import { JapaneseSearchWordControllerSearchWord200Response } from "../generated-api";
import { japaneseSearchWordApi } from "../api/client";
import { splitMora } from "../helper/split-mora";
import { useRouter, useSearchParams } from "next/navigation";

// TODO add comment
const calculateBorderClass = (
  mora: string | undefined,
  moraIndex: number,
  accent: string | undefined,
): string => {
  if (!mora || moraIndex < 0 || !accent) return "";
  const correspongingAccent = accent?.at(moraIndex);
  if (!correspongingAccent) return "";
  const nextAccent = accent?.at(moraIndex + 1);
  if (!nextAccent) return "";

  let classArr: string[] = [];
  switch (correspongingAccent) {
    case "H":
      classArr.push("border-t");
      break;
    case "L":
      classArr.push("border-b");
      break;
    default:
      return "";
  }
  if (nextAccent === "-") {
    const finalAccent = accent.at(moraIndex + 2);
    if (finalAccent) {
      const isLowToHigh = correspongingAccent === "L" && finalAccent === "H";
      const isHighToLow = correspongingAccent === "H" && finalAccent === "L";
      if (isHighToLow || isLowToHigh) {
        classArr.push("border-r");
      }
    }
  } else {
    const isLowToHigh = correspongingAccent === "L" && nextAccent === "H";
    const isHighToLow = correspongingAccent === "H" && nextAccent === "L";
    if (isHighToLow || isLowToHigh) {
      classArr.push("border-r");
    }
  }
  return classArr.join(" ");
};
/**
 * TODO fix this: The rendering logic is doing too much.
 * form management
URL state management
API calls
result formatting
accent rendering
dictionary-like display logic
inline map/set dedupe
 */
export default function Japanese() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [input, setInput] = useState(query);

  const [result, setResult] =
    useState<JapaneseSearchWordControllerSearchWord200Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setInput(query);
    const controller = new AbortController();

    async function fetchResults() {
      if (!query.trim()) {
        setResult(null);
        setLoading(false);
        setError(null);
        return;
      }

      // search action dispatch
      setResult(null);
      setLoading(true);
      setError(null);
      try {
        const cleanFormat = false;
        const withComment = true;
        const { data } =
          await japaneseSearchWordApi.japaneseSearchWordControllerSearchWord(
            query,
            cleanFormat,
            withComment,
            { signal: controller.signal },
          );
        // search success
        setResult(data);
      } catch (err: any) {
        // search error
        if (controller.signal.aborted) return;
        setError(err);
        console.error(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    fetchResults();
    return () => {
      controller.abort();
    };
  }, [query]);

  async function updateQueryParam(e: React.SubmitEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", input);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <form onSubmit={updateQueryParam} className="flex flex-row gap-3">
        <input
          placeholder="Search..."
          name="searchQuery"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded p-1 px-2 grow"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="border rounded p-1 px-2 hover:bg-blue-300 focus:outline-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </form>

      <div className="border rounded p-1 px-2 grow text-wrap overflow-x-auto overflow-y-scroll">
        {loading && <p>Searching...</p>}
        {error && <p className="text-red-500">Some thing went wrong...</p>}
        {result && (
          <>
            <div>
              {result.words?.map((word, wordIndex) => (
                <div key={wordIndex} className="pb-2">
                  <div>
                    <b>{word.word}</b>
                    <span className="text-sm">
                      <span>&nbsp;</span>
                      <span className="inline-flex gap-2 w-fit">
                        {[
                          ...new Map(
                            word.pronunciation?.map((item) => [
                              [item.accent, item.kana].join(),
                              item,
                            ]),
                          ).values(),
                        ]
                          // ?.filter((pronunc) => pronunc.kana == word.phonetic)
                          ?.map((pronunc, pronuncIndex) => (
                            <span key={pronuncIndex}>
                              {splitMora(pronunc.kana).map(
                                (mora, moraIndex) => (
                                  <span
                                    key={moraIndex}
                                    className={calculateBorderClass(
                                      mora,
                                      moraIndex,
                                      pronunc.accent,
                                    )}
                                  >
                                    {mora}
                                  </span>
                                ),
                              )}
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
                      <span className="text-blue-600">
                        {word.comments[0].like ?? 0}
                      </span>
                      /
                      <span className="text-red-600">
                        {word.comments[0].dislike ?? 0}
                      </span>
                      &#41; &nbsp;
                      {word.comments[0].mean}
                    </p>
                  )}
                  {word.synsets && (
                    <div>
                      <span className="italic" title="Synonym / Đồng nghĩa">
                        Syn:{" "}
                      </span>
                      {[
                        ...new Set(
                          word.synsets
                            .map((synset) => synset.entry)
                            .flat()
                            .map((entry) => entry?.synonym)
                            .flat()
                            .filter(Boolean),
                        ),
                      ].join("; ")}
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
              ))}
            </div>
          </>
        )}
        {!loading && !error && !result && <p>Search something...</p>}
        {/* {TODO rethink the logic to handle the case where search found nothing.} */}
      </div>
    </div>
  );
}
