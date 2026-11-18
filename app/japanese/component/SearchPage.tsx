"use client";

import { useSearchParams } from "next/navigation";
import { useJapaneseSearch } from "../hook/useJapaneseSearch";
import { SearchForm } from "./SearchForm";
import { SearchResult } from "./SearchResult";
import { useEffect, useRef } from "react";

export function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const { result, loading, error } = useJapaneseSearch(query);

  function handleSearch(newQuery: string): void {
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", newQuery);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }

  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        !(event.target instanceof HTMLInputElement) &&
        !(event.target instanceof HTMLTextAreaElement) &&
        !(event.target instanceof HTMLSelectElement)
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full">
      <SearchForm
        query={query}
        onSubmit={handleSearch}
        searchInputRef={searchInputRef}
      />

      <SearchResult
        result={result}
        loading={loading}
        error={error}
        onWordClick={handleSearch}
      />
    </div>
  );
}
