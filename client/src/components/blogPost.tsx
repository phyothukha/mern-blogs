import { FC, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Iblog } from "../store/server/blog-post/interface";
import { flushSync } from "react-dom";
import { IAuthUser } from "../store/server/interface";

interface BlogPostProps {
  blog: Iblog;
}

const BlogPost: FC<BlogPostProps> = ({ blog }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTransition = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(async () => {
          navigate(`/blog-category/blog-detail/${blog._id}`, {
            state: location.pathname + location.search,
          });
        });
      });
    }
  };

  return (
    <div
      onClick={handleTransition}
      className=" card sm:card-side cursor-pointer hover:bg-base-200 sm:max-w-none "
    >
      <figure className="mx-auto w-full object-cover p-6 max-sm:pb-0 sm:max-w-[12rem] sm:pe-0">
        <img
          loading="lazy"
          src={`${blog.thumbnail}`}
          className="border-base-content bg-base-300 rounded-btn border border-opacity-5 transition duration-200"
          style={{
            viewTransitionName: `blog-${blog._id}`,
          }}
        />
      </figure>
      <div className="card-body">
        <div
          className=" flex gap-2 items-center"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile?userId=${(blog.user as IAuthUser)._id}`);
          }}
        >
          <div className=" w-8 h-8">
            <img
              src={`${(blog.user as IAuthUser).avatar}`}
              alt=""
              className=" rounded-full"
            />
          </div>
          <p className=" hover:underline">{(blog.user as IAuthUser).name}</p>
        </div>
        <h2 className="card-title">{blog.title}</h2>
        <p className="text-xs opacity-60">{blog.description}</p>
        <p className=" text-end text-xs">
          {new Date(blog.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
