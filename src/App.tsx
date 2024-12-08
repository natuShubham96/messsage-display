import { lazy, Suspense, useEffect, useState } from "react";
import { Message } from "./types.module";
import { groupDataByYear, input } from "./utils";

const Header = lazy(() => import("./Components/Header"));
const MessageListing = lazy(() => import("./Components/MessageListing"));
const AddDetailsForm = lazy(() => import("./Components/AddDetailsForm"));

const App = () => {
  const [data, setData] = useState<Message[]>();
  const [sortedListing, setSortedListing] = useState<Map<number, Message[]>>(
    new Map()
  );
  const [sortingStatus, setSortingStatus] = useState<string>("initial");
  const [screen, setScreen] = useState<string>("listing");
  const [draggedTileIndex, setDraggedTileIndex] = useState<number | null>(null);

  useEffect(() => {
    setData(input);
  }, []);

  useEffect(() => {
    onSortingButtonsClick(sortingStatus);
  }, [data]);

  const onSortingButtonsClick = (type: string) => {
    if (type === "initial") {
      setSortedListing(groupDataByYear(data || []));
    } else if (type === "sorted") {
      const clonedData = sortedListing;
      Array.from(clonedData.keys()).forEach((key) => {
        const details = clonedData.get(key) || [];
        details.sort(
          (detail1, detail2) =>
            new Date(detail1.date).getTime() - new Date(detail2.date).getTime()
        );
        clonedData.set(key, details);
      });
      setSortedListing(clonedData);
    }
    setSortingStatus(type);
  };

  const onAddDetailsClick = () => {
    setScreen("addDetails");
  };

  const onSubmitDetails = (details: Message) => {
    if (data) {
      const dataCloned = [...data];
      dataCloned.push(details);
      const year = new Date(details.date).getFullYear();
      const clonedSortedListing = new Map(sortedListing);
      if(clonedSortedListing.has(year)) {
        const clonedDetails = clonedSortedListing.get(year) || [];
        clonedDetails?.push(details);
        clonedSortedListing.set(year, clonedDetails);
      } else {
        clonedSortedListing.set(year, [details]);
      }
      setSortedListing(clonedSortedListing);
      setData(dataCloned);
      setScreen("listing");
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedTileIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (year: number, index: number) => {
    if (draggedTileIndex === null || draggedTileIndex === index) return;

    if (sortedListing.get(year)) {
      const yearDetails = sortedListing.get(year) || [];
      const clonedYearDetails = [...yearDetails];
      const [draggedTile] = clonedYearDetails.splice(draggedTileIndex, 1);
      clonedYearDetails.splice(index, 0, draggedTile);
      const clonedListing = new Map(sortedListing);
      clonedListing.set(year, clonedYearDetails);
      setSortedListing(clonedListing);
      setDraggedTileIndex(null);
    }
  };

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full text-base">
          Loading...
        </div>
      }
    >
      <div className="flex flex-col p-1 h-full gap-2">
        <Header
          sortingStatus={sortingStatus}
          onSortingButtonsClick={onSortingButtonsClick}
          onAddDetailsClick={onAddDetailsClick}
        />
        {screen === "listing" && (
          <MessageListing
            sortedListing={sortedListing}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
          />
        )}
        {screen === "addDetails" && (
          <AddDetailsForm
            onSubmitDetails={onSubmitDetails}
            setScreen={setScreen}
          />
        )}
      </div>
    </Suspense>
  );
};

export default App;
