"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  JapaneseApi,
  JapaneseSuggestWordResponseDto,
} from "@/app/generated-api";
import { configuration } from "@/app/api/client";

const EMPTY_SUGGESTIONS: JapaneseSuggestWordResponseDto[] = [];

export function useJapaneseWordSuggest(query: string, debounceMs: number) {
  const [suggestlist, setSuggestlist] = useState<
    JapaneseSuggestWordResponseDto[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const normalizedQuery = query.trim();

  useEffect(() => {
    if (!normalizedQuery) return;

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const api = new JapaneseApi(configuration);
        const { data } = await api.suggestWord(normalizedQuery, {
          signal: controller.signal,
        });

        setSuggestlist(data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setSuggestlist([]);
        } else if (!controller.signal.aborted) {
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
  }, [normalizedQuery, debounceMs]);

  return {
    suggestlist: normalizedQuery ? suggestlist : EMPTY_SUGGESTIONS,
    loading: normalizedQuery ? loading : false,
    error: normalizedQuery ? error : null,
  };
}
