type Props = {
  historyList: string[];
  onHistoryItemClick: (item: string) => void;
  onHistoryItemDeleteClick: (item: string) => void;
  onClearAllClick: () => void;
};

export default function HistoryList({
  historyList,
  onHistoryItemClick,
  onClearAllClick,
  onHistoryItemDeleteClick,
}: Props) {
  return (
    <>
      <div className="flex justify-between">
        <span className="px-2 py-1">History / lịch sử</span>
        <button
          type="button"
          className="px-4 py-1 hover:bg-gray-100"
          onClick={onClearAllClick}
        >
          Clear
        </button>
      </div>
      {!historyList.length && (
        <div className="p-2">
          <i>Empty.</i>
        </div>
      )}
      {!!historyList.length &&
        historyList.map((item, index) => (
          <div key={index} className="flex align-middle justify-between">
            <div
              className=" hover:bg-gray-100 p-2 grow"
              onClick={() => onHistoryItemClick(item)}
            >
              <b>{item}</b>
            </div>
            <button
              type="button"
              className="px-4 py-2 hover:bg-gray-100"
              onClick={() => onHistoryItemDeleteClick(item)}
            >
              X
            </button>
          </div>
        ))}
    </>
  );
}
