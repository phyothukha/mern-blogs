import { Link, useParams } from "react-router-dom";
import { useGetBlogByCategory } from "../../../../store/server/blog-post/queries";
import Pagination from "../../../../components/pagination";
import UsePagination from "../../../../hooks/use-pagination";

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
        <Link
          key={blog._id}
          className="card sm:card-side hover:bg-base-200 transition-colors sm:max-w-none"
          to={`/blog-category/blog-detail/${blog._id}`}
        >
          <figure className="mx-auto w-full object-cover p-6 max-sm:pb-0 sm:max-w-[12rem] sm:pe-0">
            <img
              loading="lazy"
              src={blog.thumbnail as string}
              className="border-base-content bg-base-300 rounded-btn border border-opacity-5"
              alt="How to install SvelteKit with daisyUI?"
              style={{
                viewTransitionName: "hello",
              }}
            />
          </figure>
          <div
            className="card-body"
            style={{
              viewTransitionName: "howtoinstallsveltekitanddaisyui-text",
            }}
          >
            <h2 className="card-title">{blog.title}</h2>
            <p className="text-xs opacity-60">{blog.description}</p>
          </div>
        </Link>
      ))}

      <Pagination
        total={BlogDeatilData?.total as number}
        page={page}
        handlePage={handlePage}
      />
    </div>
  );
};

export default MainSide;
