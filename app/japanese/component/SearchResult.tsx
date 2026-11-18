import { JapaneseSearchWordControllerSearchWord200Response } from "@/app/generated-api";
import { WordEntry } from "./WordEntry";

type Props = {
  result: JapaneseSearchWordControllerSearchWord200Response | null;
  loading: boolean;
  error: unknown;
  onWordClick: (value: string) => void;
};

export function SearchResult({ result, loading, error, onWordClick }: Props) {
  if (loading) return <p>Searching...</p>;
  if (error) return <p className="text-red-500">Something went wrong...</p>;
  if (!result) return <p>Search something...</p>;
  if (!result.words?.length) return <p>Found nothing.</p>;

  return result.words?.map((word, wordIndex) => (
    <WordEntry key={wordIndex} word={word} onWordClick={onWordClick} />
  ));
}
