import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetBlogByUser } from "../../../../store/server/blog-post/queries";
import UsePagination from "../../../../hooks/use-pagination";
import Pagination from "../../../../components/pagination";
import BlogPost from "../../../../components/blogPost";
import Loader from "../../../../components/loader";

const UserBlog = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.get("userId");
  const { page, setPage } = UsePagination();
  const { data: getBlogByUser, isLoading } = useGetBlogByUser({
    id: String(params),
    page,
  });
  const handlePage = (p: number) => {
    setPage(p);
  };
  useEffect(() => {
    if (!params) return;
  }, [params]);

  if (isLoading) <Loader />;
  return (
    <div className="">
      {Number(getBlogByUser?.blogs.length) < 1 && (
        <div className=" text-center w-full">
          <img
            src="/9264885-removebg-preview.png"
            alt=""
            className=" mx-auto"
          />
        </div>
      )}
      {getBlogByUser?.blogs.map((childBlog) => (
        <BlogPost key={childBlog._id} blog={childBlog} />
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
