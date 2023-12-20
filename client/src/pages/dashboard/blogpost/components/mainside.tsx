import { useParams } from "react-router-dom";
import { useGetBlogByCategory } from "../../../../store/server/blog-post/queries";
import Pagination from "../../../../components/pagination";
import UsePagination from "../../../../hooks/use-pagination";
import BlogPost from "../../../../components/blogPost";

const MainSide = () => {
  const { id } = useParams();
  const { page, setPage } = UsePagination();

  const handlePage = (p: number) => {
    setPage(p);
  };

  const { data: BlogDeatilData, isLoading } = useGetBlogByCategory({
    id: String(id),
    page,
  });

  if (isLoading) {
    return (
      <div className=" justify-center h-screen flex items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className=" my-4">
      {BlogDeatilData?.blogs.map((blog) => (
        <BlogPost blog={blog} />
      ))}

      {Number(BlogDeatilData?.total) > 1 && (
        <Pagination
          total={BlogDeatilData?.total as number}
          page={page}
          handlePage={handlePage}
        />
      )}
    </div>
  );
};

export default MainSide;
