import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const UsePagination = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const currentPage = searchparams.get("page");
  const currentParams = searchparams.get("userId");

  const [page, setPageState] = useState(Number(currentPage) || 1);

  const setPage = useCallback(
    (p: number) => {
      setSearchParams(
        currentParams
          ? {
              userId: currentParams,
              page: `${p}`,
            }
          : { page: `${p}` }
      );
      setPageState(p);
    },
    [setSearchParams, currentParams]
  );

  useEffect(() => {
    setPage(Number(currentPage) || 1);
  }, [currentPage, setPage]);

  return { page, setPage };
};

export default UsePagination;
