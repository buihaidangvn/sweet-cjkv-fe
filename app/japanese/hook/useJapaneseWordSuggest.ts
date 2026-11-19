"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { DefaultApi } from "@/app/generated-api";
import { configuration } from "@/app/api/client";

export function useJapaneseWordSuggest(query: string, debounceMs: number) {
  const [suggestlist, setSuggestlist] = useState<
    | {
        word: string;
        pronunciation: string;
        mean: string;
      }[]
    | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const api = new DefaultApi(configuration);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestlist([]);
      setLoading(false);
      setError(null);
      return;
    }
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await api.japaneseSuggestWordGet(query, {
          signal: controller.signal,
        });

        const splited = data.map((f) => f.split("#"));

        setSuggestlist(
          splited.map((entry) => ({
            word: entry[0] ?? "",
            pronunciation: entry[1] ?? "",
            mean: entry[2] ?? "",
          })),
        );
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setSuggestlist([]);
        } else if (!controller.signal.aborted) {
          console.log(err);
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, debounceMs);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  return { suggestlist, loading, error };
}
