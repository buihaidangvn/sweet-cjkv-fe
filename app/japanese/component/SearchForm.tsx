"use client";
import { useEffect, useMemo, useState } from "react";
import { useJapaneseWordSuggest } from "../hook/useJapaneseWordSuggest";
import { useClickOutside } from "@/app/hook/useClickOutside";
import SuggestList from "./SuggestList";
import HistoryList from "./HistoryList";

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
              <SuggestList
                suggestList={inverseSuggestList}
                onSuggestListItemClick={(suggest) => {
                  onSubmit(suggest.word);
                  setShouldShowSuggestOrHistoryList(false);
                }}
              />
            </div>
          )}

        {!input.length && shouldShowSuggestOrHistoryList && (
          <div className="absolute bottom-full w-full border rounded bg-white">
            <HistoryList
              historyList={inverseHistoryList}
              onHistoryItemClick={(item) => {
                onSubmit(item);
                setShouldShowSuggestOrHistoryList(false);
              }}
              onHistoryItemDeleteClick={(item) => onRemoveHistory(item)}
              onClearAllClick={onClearHistory}
            />
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
