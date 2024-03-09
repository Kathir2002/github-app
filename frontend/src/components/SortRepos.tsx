const SortRepos = ({ sortType, onSort }: any) => {
  console.log(sortType);

  const BUTTONS = [
    { type: "recent", text: "Most Recent" },
    { type: "stars", text: "Most Stars" },
    { type: "forks", text: "Most Forks" },
  ];
  return (
    <div className="mb-2 flex justify-center lg:justify-end">
      {BUTTONS.map((button: any, index: number) => (
        <button
          key={index}
          onClick={() => onSort(button?.type)}
          type="button"
          className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass ${
            sortType == button?.type ? "border-blue-500" : ""
          }`}
        >
          {button?.text}
        </button>
      ))}
    </div>
  );
};

export default SortRepos;
