import { JapaneseSuggestWordResponseDto } from "@/app/generated-api";

type Props = {
  suggestList: JapaneseSuggestWordResponseDto[];
  selectedIndex: number | null;
  onSuggestListItemClick: (suggest: JapaneseSuggestWordResponseDto) => void;
};
export default function SuggestList({
  suggestList,
  selectedIndex,
  onSuggestListItemClick,
}: Props) {
  return (
    <>
      {suggestList.map((suggest, index) => (
        <div
          key={index}
          className={`p-2 hover:bg-gray-100 ${
            selectedIndex === index ? "bg-gray-100" : ""
          }`}
          onClick={() => onSuggestListItemClick(suggest)}
        >
          <b>{suggest.word}</b>
          {suggest.phonetic && (
            <>
              &nbsp;
              <span className="text-sm">{suggest.phonetic}</span>
            </>
          )}
          {suggest.mean && (
            <>
              &nbsp;
              <span className="text-sm">{suggest.mean}</span>
            </>
          )}
        </div>
      ))}
    </>
  );
}
