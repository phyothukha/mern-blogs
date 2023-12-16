// import { useParams } from "react-router-dom";
// import { useGetBlogs } from "../../../../store/server/blog-post/queries";

const BlogDetail = () => {
  //   const { id } = useParams();
  //   const { data: BlogData } = useGetBlogs();
  //   const blogbyCategory = BlogData?.filter((blog) => blog.id === id);
  //   console.log(blogbyCategory);

  return (
    <div>
      <figure className="mx-auto w-full object-cover p-6 max-sm:pb-0 sm:max-w-[12rem] sm:pe-0">
        <img
          loading="lazy"
          //   src={blog.thumbnail as string}
          className="border-base-content bg-base-300 rounded-btn border border-opacity-5"
          alt="How to install SvelteKit with daisyUI?"
          style={{
            viewTransitionName: "hello",
          }}
        />
      </figure>
    </div>
  );
};

export default BlogDetail;
