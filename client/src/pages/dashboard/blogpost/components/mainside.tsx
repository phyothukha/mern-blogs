import { useParams } from "react-router-dom";
import { useGetBlogByCategory } from "../../../../store/server/blog-post/queries";
import Pagination from "../../../../components/pagination";
import UsePagination from "../../../../hooks/use-pagination";
import BlogPost from "../../../../components/blogPost";
import Loader from "../../../../components/loader";

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
  console.log(BlogDeatilData);

  if (isLoading) <Loader />;

  return (
    <div className=" my-4">
      {BlogDeatilData?.blogs.map((blog) => (
        <BlogPost key={blog._id} blog={blog} />
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
