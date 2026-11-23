const STORAGE_KEY = "search_history";
const MAX_HISTORY = 20;

export const searchHistoryService = {
  getAll(): string[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  add(search: string): void {
    const history = this.getAll();

    const updated = [
      search,
      ...history.filter((item) => item !== search),
    ].slice(0, MAX_HISTORY);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  remove(search: string): void {
    const updated = this.getAll().filter((item) => item !== search);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
