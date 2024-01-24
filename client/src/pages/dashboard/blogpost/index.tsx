import BlogPost from "../../../components/blogPost";
import Loader from "../../../components/loader";
import { useGetBlogs } from "../../../store/server/blog-post/queries";

const AllFile = () => {
  const { data: BlogData, isLoading } = useGetBlogs();

  if (isLoading) <Loader />;

  return (
    <div className=" my-4">
      {BlogData?.map((mainBlg) => (
        <div key={mainBlg.id}>
          {mainBlg.blogs.map((childBlog) => (
            <BlogPost key={childBlog._id} blog={childBlog} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AllFile;
