import { FC } from "react";

interface PaginationProps {
  total: number;
  page: number;
  handlePage: (num: number) => void;
}

const Pagination: FC<PaginationProps> = ({ total, page, handlePage }) => {
  // const PaginationArray = [...Array(total)].map((_, i) => i + 1);
  const generatePageArray = () => {
    const pageArray = [];
    for (let i = 1; i <= total; i++) {
      if (i <= 1 || i >= total || (i >= page - 1 && i <= page + 1)) {
        pageArray.push(i);
      } else if (pageArray[pageArray.length - 1] !== "ellipsis") {
        pageArray.push("ellipsis");
      }
    }
    return pageArray;
  };
  generatePageArray();

  return (
    <div className=" text-end m-3">
      <div className="join">
        <button
          className="join-item btn"
          disabled={page <= 1}
          onClick={() => handlePage(page - 1)}
        >
          «
        </button>

        {generatePageArray().map((num, idx) => (
          <button
            key={idx}
            className={` join-item btn ${page == num && " btn-active"} ${
              num === "ellipsis" && "btn-disabled"
            }`}
            onClick={() =>
              num !== "ellipsis" ? handlePage(Number(num)) : null
            }
          >
            {num === "ellipsis" ? "..." : num}
          </button>
        ))}

        <button
          className="join-item btn"
          disabled={page >= total}
          onClick={() => handlePage(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
