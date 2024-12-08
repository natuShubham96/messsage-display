import { lazy } from "react";
import { Message } from "../types.module";

const MessageDetails = lazy(() => import("./MessageDetails"));

interface Props {
  sortedListing: Map<number, Message[]>;
  handleDragStart: (arg0: number) => void;
  handleDragOver: (arg0: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (arg0: number, arg1: number) => void;
}

const MessageListing = ({
  sortedListing,
  handleDragStart,
  handleDragOver,
  handleDrop,
}: Props) => {
  return (
    <div className="flex flex-col border border-[gray] h-full gap-2 p-1">
      {Array.from(sortedListing.keys()).map((key) => {
        return (
          <div className="flex gap-1 items-center">
            <span className="font-bold">{key}</span>
            <div className="flex gap-2 flex-wrap">
              {sortedListing.get(key)?.map((messageDetail, index) => (
                <MessageDetails
                  messageDetail={messageDetail}
                  year={key}
                  index={index}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageListing;
