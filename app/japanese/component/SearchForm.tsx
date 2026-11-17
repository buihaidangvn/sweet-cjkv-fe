"use client";
import { useEffect, useState } from "react";

type Props = {
  query: string;
  onSubmit: (value: string) => void;
};

export function SearchForm({ query, onSubmit }: Props) {
  const [input, setInput] = useState(query);

  useEffect(() => {
    setInput(query);
  }, [query]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(input.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-3">
      <input
        placeholder="Search..."
        name="searchQuery"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border rounded p-1 px-2 grow"
      />

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
