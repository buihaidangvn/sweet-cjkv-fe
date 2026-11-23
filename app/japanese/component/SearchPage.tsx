"use client";

import { useSearchParams } from "next/navigation";
import { useJapaneseSearch } from "../hook/useJapaneseSearch";
import { SearchForm } from "./SearchForm";
import { SearchResult } from "./SearchResult";
import { useEffect, useRef } from "react";
import { useSearchHistory } from "@/app/hook/useSearchHistory";

export function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const searchHistory = useSearchHistory();

  const { result, loading, error } = useJapaneseSearch(query);

  function handleSearch(newQuery: string): void {
    if (newQuery === query) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("query", newQuery);

    window.history.replaceState(null, "", `?${params.toString()}`);
    searchHistory.add(newQuery);
  }

  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!searchInputRef.current) return;
      if (
        event.key === "/" &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement) &&
        !(event.target instanceof HTMLSelectElement)
      ) {
        event.preventDefault();
        searchInputRef.current.focus();

        // move cursor to the end
        const length = searchInputRef.current.value.length;
        searchInputRef.current.setSelectionRange(length, length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="border rounded p-1 px-2 grow text-wrap overflow-x-auto overflow-y-scroll">
        <SearchResult
          result={result}
          loading={loading}
          error={error}
          onWordClick={handleSearch}
        />
      </div>

      <SearchForm
        query={query}
        onSubmit={handleSearch}
        searchInputRef={searchInputRef}
        history={searchHistory.history}
        onClearHistory={searchHistory.clear}
        onRemoveHistory={searchHistory.remove}
      />
    </div>
  );
}
