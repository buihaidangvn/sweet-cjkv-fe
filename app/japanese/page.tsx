"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useJapaneseSearch } from "./hook/useJapaneseSearch";
import { SearchResult } from "./component/SearchResult";
import { SearchForm } from "./component/SearchForm";

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

  const { result, loading, error } = useJapaneseSearch(query);

  function handleSearch(newQuery: string): void {
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", newQuery);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <SearchForm query={query} onSubmit={handleSearch} />
      <SearchResult result={result} loading={loading} error={error} />
    </div>
  );
}
