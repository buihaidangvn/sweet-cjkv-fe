"use client";

import { useState } from "react";
import {
  Configuration,
  JapaneseSearchWordApi,
  JapaneseSearchWordControllerSearchWord200Response,
} from "../generated-api";
import { japaneseSearchWordApi } from "../api/client";
import { splitMora } from "../helper/split-mora";
import { trimChar } from "../helper/trim-char";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] =
    useState<JapaneseSearchWordControllerSearchWord200Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  async function handleSearch(e: any) {
    e.preventDefault();

    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const { status, data } =
        await japaneseSearchWordApi.japaneseSearchWordControllerSearchWord(
          input,
          true,
        );
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <form onSubmit={handleSearch} className="flex flex-row gap-3">
        <input
          name="myInput"
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
        {error && <p className="text-red-500">Error: {error}</p>}
        {result && (
          <>
            <div className="">
              {result.words?.map((word, wordIndex) => (
                <div key={wordIndex} className="pb-2">
                  <div>
                    <b>{word.word}</b>
                    <span className="text-sm">
                      <span>&nbsp;</span>
                      {/* <span>「</span> */}
                      {/* {word.phonetic} */}
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
                      {/* <span>」</span> */}
                      <span>&nbsp;</span>
                      <b>{word.han}</b>
                      <span>: </span>
                    </span>
                    {/* {[
                      ...new Set(
                        word.means?.map((mean) =>
                          trimChar(mean.mean?.trim(), "."),
                        ),
                      ),
                    ].join("; ")} */}
                    {word.short_mean}
                  </div>
                  <div>
                    Đồng nghĩa:
                    {/* {word} */}
                  </div>
                  <div>
                    Trái nghĩa:
                    {word.opposite_word}
                  </div>
                </div>
              ))}
            </div>
            <pre>{JSON.stringify(result, null, 4)}</pre>
          </>
        )}
        {!loading && !error && !result && <p>Search something...</p>}
      </div>
    </div>
  );
}
