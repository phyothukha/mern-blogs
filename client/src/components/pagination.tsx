import { FC } from "react";

interface PaginationProps {
  total: number;
  page: number;
  handlePage: (num: number) => void;
}

const Pagination: FC<PaginationProps> = ({ total, page, handlePage }) => {
  const PaginationArray = [...Array(total)].map((_, i) => i + 1);

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
        {PaginationArray.map((num) => (
          <button
            key={num}
            className={`join-item btn ${page == num && "btn-active"}`}
            onClick={() => handlePage(num)}
          >
            {num}
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
