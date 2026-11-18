type Props = {
  word: string;
  onWordClick: (word: string) => void;
  hoverContent?: string;
};

export function ClickableWord({ word, onWordClick, hoverContent }: Props) {
  return (
    <button
      type="button"
      onClick={() => onWordClick(word)}
      className="hover:underline hover:underline-offset-2 hover:cursor-pointer"
      title={hoverContent}
    >
      {word}
    </button>
  );
}
