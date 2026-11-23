"use client";
import { useEffect, useMemo, useState } from "react";
import { useJapaneseWordSuggest } from "../hook/useJapaneseWordSuggest";
import { useClickOutside } from "@/app/hook/useClickOutside";

type Props = {
  query: string;
  onSubmit: (value: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  history: string[];
  onClearHistory: () => void;
  onRemoveHistory: (search: string) => void;
};

export function SearchForm({
  query,
  onSubmit,
  searchInputRef,
  history,
  onClearHistory,
  onRemoveHistory,
}: Props) {
  const [input, setInput] = useState(query);
  const { suggestlist, loading, error } = useJapaneseWordSuggest(input, 500);
  const inverseSuggestList = useMemo(() => {
    if (!suggestlist) return suggestlist;
    return [...suggestlist].reverse();
  }, [suggestlist]);
  const inverseHistoryList = useMemo(() => {
    return [...history].reverse();
  }, [suggestlist]);
  const [shouldShowSuggestOrHistoryList, setShouldShowSuggestOrHistoryList] =
    useState(false);
  const divRef = useClickOutside(() => {
    setShouldShowSuggestOrHistoryList(false);
  });

  useEffect(() => {
    setInput(query);
  }, [query]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setShouldShowSuggestOrHistoryList(false);
    const value = input.trim();
    onSubmit(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-3">
      <div className="relative grow" ref={divRef}>
        <input
          ref={searchInputRef}
          placeholder="Search..."
          name="searchQuery"
          autoComplete="off"
          value={input}
          onFocus={() => setShouldShowSuggestOrHistoryList(true)}
          onChange={(e) => {
            setShouldShowSuggestOrHistoryList(true);
            setInput(e.target.value);
          }}
          className="w-full border rounded p-1 px-2 grow"
        />

        {!!input.length &&
          shouldShowSuggestOrHistoryList &&
          !!inverseSuggestList?.length && (
            <div className="absolute bottom-full w-full border rounded bg-white">
              {inverseSuggestList.map((suggest, index) => (
                <div
                  key={index}
                  className=" hover:bg-gray-100 p-2"
                  onClick={() => {
                    onSubmit(suggest.word);
                    setShouldShowSuggestOrHistoryList(false);
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

        {!input.length &&
          shouldShowSuggestOrHistoryList &&
          !!history.length && (
            <div className="absolute bottom-full w-full border rounded bg-white">
              <div className="flex justify-between">
                <span className="py-1">History / lịch sử</span>
                <button
                  type="button"
                  className="px-4 py-1 hover:bg-gray-100"
                  onClick={onClearHistory}
                >
                  Clear
                </button>
              </div>
              {inverseHistoryList.map((item, index) => (
                <div key={index} className="flex align-middle justify-between">
                  <div
                    className=" hover:bg-gray-100 p-2 grow"
                    onClick={() => {
                      onSubmit(item);
                      setShouldShowSuggestOrHistoryList(false);
                    }}
                  >
                    <b>{item}</b>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 hover:bg-gray-100"
                    onClick={() => onRemoveHistory(item)}
                  >
                    X
                  </button>
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
