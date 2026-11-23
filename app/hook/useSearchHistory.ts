import { useState, useCallback, useEffect } from "react";
import { searchHistoryService } from "../service/searchHistoryService";

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(searchHistoryService.getAll());
  }, []);

  const add = useCallback((search: string) => {
    searchHistoryService.add(search);
    setHistory(searchHistoryService.getAll());
  }, []);

  const remove = useCallback((search: string) => {
    searchHistoryService.remove(search);
    setHistory(searchHistoryService.getAll());
  }, []);

  const clear = useCallback(() => {
    searchHistoryService.clear();
    setHistory([]);
  }, []);

  return { history, add, remove, clear };
}
