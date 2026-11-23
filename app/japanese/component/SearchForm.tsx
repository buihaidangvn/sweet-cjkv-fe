"use client";
import { useEffect, useMemo, useReducer, useState } from "react";
import { useJapaneseWordSuggest } from "../hook/useJapaneseWordSuggest";
import { useClickOutside } from "@/app/hook/useClickOutside";
import SuggestList from "./SuggestList";
import HistoryList from "./HistoryList";

type DropdownState = {
  type: "closed" | "history" | "suggest";
  selectedIndex: number | null;
};

type Action =
  | { type: "OPEN"; list: "history" | "suggest" }
  | { type: "CLOSE" }
  | { type: "MOVE"; direction: 1 | -1; itemCount: number }
  | { type: "RESET_SELECTION" };

const initialState: DropdownState = {
  type: "closed",
  selectedIndex: null,
};

function dropdownReducer(state: DropdownState, action: Action): DropdownState {
  switch (action.type) {
    case "OPEN":
      return {
        type: action.list,
        selectedIndex: null,
      };

    case "CLOSE":
      return initialState;

    case "RESET_SELECTION":
      return {
        ...state,
        selectedIndex: null,
      };

    case "MOVE": {
      if (action.itemCount === 0) return state;

      const current = state.selectedIndex;

      return {
        ...state,
        selectedIndex:
          current === null
            ? action.direction === 1
              ? 0
              : action.itemCount - 1
            : (current + action.direction + action.itemCount) %
              action.itemCount,
      };
    }

    default:
      return state;
  }
}

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
  const [dropdown, dispatch] = useReducer(dropdownReducer, initialState);

  const activeItems = useMemo(() => {
    if (dropdown.type === "suggest") {
      return (suggestlist ?? []).slice().reverse();
    }

    if (dropdown.type === "history") {
      return history.slice().reverse();
    }

    return [];
  }, [dropdown.type, suggestlist, history]);

  useEffect(() => {
    dispatch({ type: "RESET_SELECTION" });
  }, [suggestlist, history]);

  const divRef = useClickOutside(() => {
    dispatch({
      type: "CLOSE",
    });
  });

  useEffect(() => {
    setInput(query);
  }, [query]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    const value = input.trim();
    if (!value) return;
    e.preventDefault();
    dispatch({
      type: "CLOSE",
    });
    onSubmit(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      if (dropdown.type !== "closed") {
        dispatch({
          type: "CLOSE",
        });
      } else {
        searchInputRef.current?.blur();
      }
      return;
    }

    if (!activeItems.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      dispatch({
        type: "MOVE",
        direction: 1,
        itemCount: activeItems.length,
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      dispatch({
        type: "MOVE",
        direction: -1,
        itemCount: activeItems.length,
      });
    } else if (e.key === "Enter" && dropdown.selectedIndex !== null) {
      const selected = activeItems[dropdown.selectedIndex];
      if (!selected) return;
      e.preventDefault();
      searchInputRef.current?.blur();
      if (dropdown.type === "suggest" && typeof selected !== "string") {
        onSubmit(selected.word);
      } else if (dropdown.type === "history" && typeof selected === "string") {
        onSubmit(selected);
      }

      dispatch({
        type: "CLOSE",
      });
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
            dispatch({
              type: "OPEN",
              list: !!input.trim().length ? "suggest" : "history",
            });
          }}
          onChange={(e) => {
            const nextInput = e.target.value;
            setInput(nextInput);
            dispatch({
              type: "OPEN",
              list: !!nextInput.length ? "suggest" : "history",
            });
          }}
          className="w-full border rounded p-1 px-2 grow"
        />

        {dropdown.type === "suggest" &&
          !!activeItems.every((i) => typeof i !== "string") &&
          !!activeItems.length && (
            <div className="absolute bottom-full w-full border rounded bg-white">
              <SuggestList
                suggestList={activeItems}
                selectedIndex={dropdown.selectedIndex}
                onSuggestListItemClick={(suggest) => {
                  onSubmit(suggest.word);
                  dispatch({
                    type: "CLOSE",
                  });
                }}
              />
            </div>
          )}

        {dropdown.type === "history" &&
          !!activeItems.every((i) => typeof i === "string") && (
            <div className="absolute bottom-full w-full border rounded bg-white">
              <HistoryList
                historyList={activeItems}
                selectedIndex={dropdown.selectedIndex}
                onHistoryItemClick={(item) => {
                  onSubmit(item);
                  dispatch({
                    type: "CLOSE",
                  });
                }}
                onHistoryItemDeleteClick={(item) => {
                  onRemoveHistory(item);
                  dispatch({
                    type: "RESET_SELECTION",
                  });
                }}
                onClearAllClick={() => {
                  onClearHistory();
                  dispatch({
                    type: "RESET_SELECTION",
                  });
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
