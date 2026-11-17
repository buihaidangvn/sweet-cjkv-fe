import { useEffect, useState } from "react";
import { JapaneseSearchWordControllerSearchWord200Response } from "../../generated-api";
import { japaneseSearchWordApi } from "../../api/client";

export function useJapaneseSearch(query: string) {
  const [result, setResult] =
    useState<JapaneseSearchWordControllerSearchWord200Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchResults() {
      if (!query.trim()) {
        setResult(null);
        setLoading(false);
        setError(null);
        return;
      }

      setResult(null);
      setLoading(true);
      setError(null);

      try {
        const { data } =
          await japaneseSearchWordApi.japaneseSearchWordControllerSearchWord(
            query,
            false,
            true,
            { signal: controller.signal },
          );

        setResult(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchResults();

    return () => controller.abort();
  }, [query]);

  return { result, loading, error };
}
