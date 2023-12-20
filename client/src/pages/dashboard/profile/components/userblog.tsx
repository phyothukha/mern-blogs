import { useEffect } from "react";
import {  useSearchParams } from "react-router-dom";
import { useGetBlogByUser } from "../../../../store/server/blog-post/queries";
import UsePagination from "../../../../hooks/use-pagination";
import Pagination from "../../../../components/pagination";
import BlogPost from "../../../../components/blogPost";

const UserBlog = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.get("userId");
  const { page, setPage } = UsePagination();
  const { data: getBlogByUser } = useGetBlogByUser({
    id: String(params),
    page,
  });
  const handlePage = (p: number) => {
    setPage(p);
  };

  useEffect(() => {
    if (!params) return;
  }, [params]);

  return (
    <div className="">

      {getBlogByUser?.blogs.map((childBlog) => (
        <BlogPost blog={childBlog} />
      ))}

      {Number(getBlogByUser?.total) > 1 && (
        <Pagination
          total={getBlogByUser?.total as number}
          page={page}
          handlePage={handlePage}
        />
      )}
    </div>
  );
};

export default UserBlog;
