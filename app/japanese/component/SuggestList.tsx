import { JapaneseSuggestWordResponseDto } from "@/app/generated-api";

type Props = {
  suggestList: JapaneseSuggestWordResponseDto[];
  onSuggestListItemClick: (suggest: JapaneseSuggestWordResponseDto) => void;
};
export default function SuggestList({
  suggestList,
  onSuggestListItemClick,
}: Props) {
  return (
    <>
      {suggestList.map((suggest, index) => (
        <div
          key={index}
          className=" hover:bg-gray-100 p-2"
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
