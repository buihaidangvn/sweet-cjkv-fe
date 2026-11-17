"use client";

import { useSearchParams } from "next/navigation";
import { useJapaneseSearch } from "../hook/useJapaneseSearch";
import { SearchForm } from "./SearchForm";
import { SearchResult } from "./SearchResult";

export function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const { result, loading, error } = useJapaneseSearch(query);

  function handleSearch(newQuery: string): void {
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", newQuery);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <SearchForm query={query} onSubmit={handleSearch} />
      <SearchResult result={result} loading={loading} error={error} />
    </div>
  );
}
