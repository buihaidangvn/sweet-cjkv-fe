'use client';

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e: any) {
    e.preventDefault();

    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `https://api.example.com/search?q=${encodeURIComponent(input)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
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
          className="border rounded p-1 px-2 flex-grow"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="border rounded p-1 px-2 hover:bg-blue-300 focus:outline-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </form>

      <div className="border rounded p-1 px-2 flex-grow">
        {loading && <p>Searching...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        {!loading && !error && !result && <p>Search something...</p>}
      </div>
    </div>
  );
}