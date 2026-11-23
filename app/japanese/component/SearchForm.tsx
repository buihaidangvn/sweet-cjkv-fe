"use client";
import { useEffect, useMemo, useState } from "react";
import { useJapaneseWordSuggest } from "../hook/useJapaneseWordSuggest";
import { useClickOutside } from "@/app/hook/useClickOutside";
import SuggestList from "./SuggestList";
import HistoryList from "./HistoryList";

type Props = {
  query: string;
  onSubmit: (value: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  history: string[];
  onClearHistory: () => void;
  onRemoveHistory: (search: string) => void;
};

export function SearchForm({
  query,
  onSubmit,
  searchInputRef,
  history,
  onClearHistory,
  onRemoveHistory,
}: Props) {
  const [input, setInput] = useState(query);
  const { suggestlist } = useJapaneseWordSuggest(input, 500);
  const [showList, setShowList] = useState<null | "history" | "suggest">(null);
  const [currentSelect, setCurrentSelect] = useState<number | null>(null);

  const inverseSuggestList = useMemo(() => {
    if (!suggestlist) return suggestlist;
    return [...suggestlist].reverse();
  }, [suggestlist]);
  const inverseHistoryList = useMemo(() => {
    return [...history].reverse();
  }, [history]);

  useEffect(() => {
    setCurrentSelect(null);
  }, [suggestlist, history]);

  const divRef = useClickOutside(() => {
    setShowList(null);
    setCurrentSelect(null);
  });

  useEffect(() => {
    setInput(query);
  }, [query]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowList(null);
    setCurrentSelect(null);
    const value = input.trim();
    onSubmit(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      if (showList !== null) {
        setShowList(null);
      } else {
        searchInputRef.current?.blur();
      }
      return;
    }

    const itemCount =
      showList === "suggest"
        ? (inverseSuggestList?.length ?? 0)
        : showList === "history"
          ? inverseHistoryList.length
          : 0;
    if (!itemCount) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCurrentSelect((current) =>
        current === null ? 0 : (current + 1) % itemCount,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCurrentSelect((current) =>
        current === null
          ? itemCount - 1
          : (current - 1 + itemCount) % itemCount,
      );
    } else if (e.key === "Enter" && currentSelect !== null) {
      if (showList === "suggest") {
        const selected = inverseSuggestList?.[currentSelect];
        if (!selected) return;
        e.preventDefault();
        searchInputRef.current?.blur();
        onSubmit(selected.word);
      } else if (showList === "history") {
        const selected = inverseHistoryList[currentSelect];
        if (!selected) return;
        e.preventDefault();
        searchInputRef.current?.blur();
        onSubmit(selected);
      }

      setShowList(null);
      setCurrentSelect(null);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row gap-3">
      <div className="relative grow" ref={divRef}>
        <input
          ref={searchInputRef}
          placeholder="Search..."
          name="searchQuery"
          autoComplete="off"
          value={input}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setCurrentSelect(null);
            if (input.trim().length) {
              setShowList("suggest");
            } else {
              setShowList("history");
            }
          }}
          onChange={(e) => {
            const nextInput = e.target.value;
            setInput(nextInput);
            setCurrentSelect(null);
            if (nextInput) {
              setShowList("suggest");
            } else {
              setShowList("history");
            }
          }}
          className="w-full border rounded p-1 px-2 grow"
        />

        {showList === "suggest" && !!inverseSuggestList?.length && (
          <div className="absolute bottom-full w-full border rounded bg-white">
            <SuggestList
              suggestList={inverseSuggestList}
              selectedIndex={currentSelect}
              onSuggestListItemClick={(suggest) => {
                onSubmit(suggest.word);
                setShowList(null);
                setCurrentSelect(null);
              }}
            />
          </div>
        )}

        {showList === "history" && (
          <div className="absolute bottom-full w-full border rounded bg-white">
            <HistoryList
              historyList={inverseHistoryList}
              selectedIndex={currentSelect}
              onHistoryItemClick={(item) => {
                onSubmit(item);
                setShowList(null);
                setCurrentSelect(null);
              }}
              onHistoryItemDeleteClick={(item) => {
                onRemoveHistory(item);
                setCurrentSelect(null);
              }}
              onClearAllClick={() => {
                onClearHistory();
                setCurrentSelect(null);
              }}
            />
          </div>
        )}
      </div>

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
