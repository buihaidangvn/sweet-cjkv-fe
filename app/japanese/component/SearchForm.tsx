"use client";
import { useEffect, useState } from "react";
import { useJapaneseWordSuggest } from "../hook/useJapaneseWordSuggest";
import { useClickOutside } from "@/app/hook/useClickOutside";

type Props = {
  query: string;
  onSubmit: (value: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
};

export function SearchForm({ query, onSubmit, searchInputRef }: Props) {
  const [input, setInput] = useState(query);
  const { suggestlist, loading, error } = useJapaneseWordSuggest(input, 500);
  const [shouldShowSuggestList, setShouldShowSuggestList] = useState(false);
  const divRef = useClickOutside(() => {
    setShouldShowSuggestList(false);
  });

  useEffect(() => {
    setInput(query);
  }, [query]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(input.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-3">
      <div className="relative grow">
        <input
          ref={searchInputRef}
          placeholder="Search..."
          name="searchQuery"
          value={input}
          onFocus={() => setShouldShowSuggestList(true)}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded p-1 px-2 grow"
        />

        {shouldShowSuggestList && !!suggestlist?.length && (
          <div
            className="absolute bottom-full w-full border rounded bg-white"
            ref={divRef}
          >
            {suggestlist.map((suggest, index) => (
              <div
                key={index}
                className=" hover:bg-gray-100 p-2"
                onClick={() => {
                  onSubmit(suggest.word);
                  setShouldShowSuggestList(false);
                }}
              >
                <b>{suggest.word}</b>
                {suggest.phonetic && (
                  <>
                    &nbsp;
                    <span className="text-sm">{suggest.phonetic}</span>
                  </>
                )}
                {suggest.mean && (
                  <>
                    &nbsp;
                    <span className="text-sm">{suggest.mean}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!input.trim()}
        className="border rounded p-1 px-2 hover:bg-blue-300 focus:outline-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Search
      </button>
    </form>
  );
}
