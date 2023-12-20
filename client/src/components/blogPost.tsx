import { FC } from "react";
import { Link } from "react-router-dom";
import { Iblog } from "../store/server/blog-post/interface";
import { IAuthUser } from "../store/server/interface";

interface BlogPostProps {
  blog: Iblog;
}

const BlogPost: FC<BlogPostProps> = ({ blog }) => {
  return (
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
        <Link to={`/profile?userId=${(blog.user as IAuthUser)._id}`}>
          <div className=" flex gap-2 items-center">
            <div className=" w-8 h-8">
              <img
                src={(blog.user as IAuthUser).avatar as string}
                alt=""
                className=" rounded-full"
              />
            </div>

            <p className=" hover:underline">{(blog.user as IAuthUser).name}</p>
          </div>
        </Link>
        <h2 className="card-title">{blog.title}</h2>
        <p className="text-xs opacity-60">{blog.description}</p>
        <p className=" text-end text-xs">
          {new Date(blog.createdAt).toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default BlogPost;
