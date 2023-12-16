import { NavLink } from "react-router-dom";
import { useGetBlogs } from "../../../../store/server/blog-post/queries";

const AllFile = () => {
  const { data: BlogData } = useGetBlogs();

  return (
    <div className=" my-4">
      {BlogData?.map((mainBlg) => (
        <div key={mainBlg.id}>
          {mainBlg.blogs.map((childBlog) => (
            <NavLink
              key={childBlog._id}
              className="card sm:card-side hover:bg-base-200 transition-colors sm:max-w-none"
              to={`/blog-category/blog-detail/${childBlog._id}`}
            >
              <figure className="mx-auto w-full object-cover p-6 max-sm:pb-0 sm:max-w-[12rem] sm:pe-0">
                <img
                  loading="lazy"
                  src={childBlog.thumbnail as string}
                  className="border-base-content bg-base-300 rounded-btn border border-opacity-5"
                  alt="How to install SvelteKit with daisyUI?"
                  style={{
                    viewTransitionName: "howtoinstallsveltekitanddaisyui-img",
                  }}
                />
              </figure>
              <div
                className="card-body"
                style={{
                  viewTransitionName: " howtoinstallsveltekitanddaisyui-text",
                }}
              >
                <h2 className="card-title">{childBlog.title}</h2>
                <p className="text-xs opacity-60">{childBlog.description}</p>
              </div>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AllFile;
