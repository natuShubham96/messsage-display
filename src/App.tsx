import { lazy, Suspense, useCallback, useEffect, useState } from "react";
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

  const onSortingButtonsClick = useCallback(
    (type: string) => {
      if (type === "initial") {
        setSortedListing(groupDataByYear(data || []));
      } else if (type === "sorted") {
        const clonedData = sortedListing;
        Array.from(clonedData.keys()).forEach((key) => {
          const details = clonedData.get(key) || [];
          details.sort(
            (detail1, detail2) =>
              new Date(detail1.date).getTime() -
              new Date(detail2.date).getTime()
          );
          clonedData.set(key, details);
        });
        setSortedListing(clonedData);
      }
      setSortingStatus(type);
    },
    [sortedListing]
  );

  const onAddDetailsClick = useCallback(() => {
    setScreen("addDetails");
  }, []);

  const onSubmitDetails = useCallback(
    (details: Message) => {
      if (data) {
        const dataCloned = [...data];
        dataCloned.push(details);
        const year = new Date(details.date).getFullYear();
        const clonedSortedListing = new Map(sortedListing);
        if (clonedSortedListing.has(year)) {
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
    },
    [data]
  );

  const handleDragStart = useCallback(
    (index: number) => {
      setDraggedTileIndex(index);
    },
    [setDraggedTileIndex]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (year: number, index: number) => {
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
        setSortingStatus("rearranged");
      }
    },
    [draggedTileIndex]
  );

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
          screen={screen}
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
