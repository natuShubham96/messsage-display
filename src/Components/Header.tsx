interface Props {
  sortingStatus: string;
  onSortingButtonsClick: (arg0: string) => void;
  onAddDetailsClick: () => void;
  screen: string;
}

const Header = ({
  sortingStatus,
  onSortingButtonsClick,
  onAddDetailsClick,
  screen,
}: Props) => {
  return (
    <div className="flex justify-between">
      <button
        className="border border-[gray] p-1"
        onClick={() => screen !== "addDetails" && onAddDetailsClick()}
      >
        Add Details
      </button>
      <div className="flex gap-2">
        {screen !== "addDetails" && (
          <button
            className={`border ${
              sortingStatus === "initial"
                ? "bg-[blue] text-[white]"
                : "bg-[white] text-[black]"
            } border-[gray] p-1`}
            onClick={() =>
              sortingStatus !== "initial" && onSortingButtonsClick("initial")
            }
          >
            Initial Order
          </button>
        )}
        {screen !== "addDetails" && (
          <button
            className={`border ${
              sortingStatus === "sorted"
                ? "bg-[blue] text-[white]"
                : "bg-[white] text-[black]"
            } border-[gray] p-1`}
            onClick={() =>
              sortingStatus !== "sorted" && onSortingButtonsClick("sorted")
            }
          >
            Sorted Order
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
