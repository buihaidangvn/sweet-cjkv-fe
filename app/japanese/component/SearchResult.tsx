import { JapaneseSearchWordControllerSearchWord200Response } from "@/app/generated-api";
import { WordEntry } from "./WordEntry";
import { ClickableWordList } from "./ClickableWordList";
import React from "react";
import { ClickableWord } from "./ClickableWord";

type Props = {
  result: JapaneseSearchWordControllerSearchWord200Response | null;
  loading: boolean;
  error: unknown;
  onWordClick: (value: string) => void;
};

export function SearchResult({ result, loading, error, onWordClick }: Props) {
  if (loading) return <p>Searching...</p>;
  if (error) return <p className="text-red-500">Something went wrong...</p>;
  if (!result) return <p>Search something...</p>;
  if (!result.words?.length) return <p>Found nothing.</p>;

  return (
    <>
      {result.words?.map((word, wordIndex) => (
        <WordEntry key={wordIndex} word={word} onWordClick={onWordClick} />
      ))}
      {result.suggestWords?.length && (
        <>
          <b>Từ liên quan: </b>
          <ClickableWordList
            entries={result.suggestWords
              .filter((w) => !!w.word)
              .map((w) => ({
                word: w.word ?? "",
                hoverContent: [w.han, w.phonetic, w.short_mean]
                  .filter(Boolean)
                  .join(" | "),
              }))}
            onWordClick={onWordClick}
          />
        </>
      )}
    </>
  );
}
