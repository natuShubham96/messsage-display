import { Message } from "../types.module";

interface Props {
  messageDetail: Message;
  year: number;
  index: number;
  handleDragStart: (arg0: number) => void;
  handleDragOver: (arg0: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (arg0: number, arg1: number) => void;
}

const MessageDetails = ({
  messageDetail,
  year,
  index,
  handleDragStart,
  handleDragOver,
  handleDrop,
}: Props) => {
  return (
    <div
      className="flex flex-col border border-[gray] p-1 hover:bg-slate-600 cursor-grab max-w-[calc(25%-8px)] min-w-[170px] flex-grow flex-shrink basis-[calc(25%-8px)]"
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(year, index)}
    >
      <span>Date: {messageDetail.date}</span>
      <span>Message: {messageDetail.message}</span>
    </div>
  );
};

export default MessageDetails;
