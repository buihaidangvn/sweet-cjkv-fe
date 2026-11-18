import React from "react";
import { ClickableWord } from "./ClickableWord";

type Props = {
  entries: {
    word: string;
    hoverContent?: string;
  }[];
  onWordClick: (word: string) => void;
};

export function ClickableWordList({ entries, onWordClick }: Props) {
  return entries.map((entry, index) => (
    <React.Fragment key={index}>
      {index > 0 && "; "}
      <ClickableWord
        word={entry.word}
        onWordClick={onWordClick}
        hoverContent={entry.hoverContent}
      />
    </React.Fragment>
  ));
}
