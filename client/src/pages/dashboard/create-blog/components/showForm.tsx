import { FC } from "react";
import { IconPhoto } from "@tabler/icons-react";
import { Iblog } from "../../../../store/server/interface";

interface ShowFormProps {
  blog: Iblog;
}

const ShowForm: FC<ShowFormProps> = ({ blog }) => {
  return (
    <div className="hero w-full h-auto bg-base-200">
      <div className="hero-content flex-col justify-between items-center md:items-start md:flex-row w-full">
        <div
          className={` min-w-[150px] max-w-[250px]  flex object-cover rounded-md  
          ${
            blog.thumbnail
              ? " w-80  h-56"
              : " min-h-[250px] bg-white max-h-[250px] "
          } overflow-hidden`}
        >
          {blog.thumbnail ? (
            <img
              id="image"
              src={
                blog.thumbnail
                  ? URL.createObjectURL(blog.thumbnail as File)
                  : blog.thumbnail
              }
              className=" max-w-full max-h-full rounded-md"
            />
          ) : (
            <IconPhoto className=" text-3xl text-secondary m-auto opacity-50" />
          )}
        </div>

        <div className=" w-2/3">
          <h1 className="text-3xl font-bold">
            {blog.title ? blog.title : "Card-Title"}
          </h1>
          <p className="py-6 h-60">
            {blog.description
              ? blog.description.slice(0, 400)
              : "Blog-description..."}
          </p>
          {blog.description.length > 500 && (
            <h1 className=" text-red-400 inline-block">See more</h1>
          )}
          <br />
          {blog.title && blog.description && blog.thumbnail && (
            <p className=" text-base text-end">
              {new Date(blog.createdAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowForm;
