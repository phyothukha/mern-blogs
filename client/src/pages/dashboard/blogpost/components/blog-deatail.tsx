import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetBlog } from "../../../../store/server/blog-post/queries";
import { flushSync } from "react-dom";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import Loader from "../../../../components/loader";
import Comment from "../../comment/comments";

const BlogDetail = () => {
  const { id } = useParams();
  const { data: getBlog, isLoading } = useGetBlog(id || "");

  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  return (
    <div className=" my-5">
      <p
        className=" cursor-pointer duration-300"
        onClick={() => {
          document.startViewTransition(() => {
            flushSync(() => {
              navigate(location.state);
            });
          });
        }}
      >
        <IconArrowNarrowLeft className=" text-error" />
      </p>
      <figure className="mx-auto w-full  object-cover p-6 max-sm:pb-0 sm:max-w-[400px] sm:pe-0">
        <img
          loading="lazy"
          src={getBlog?.BlogImage}
          className="border-base-content  bg-base-300   rounded-btn border border-opacity-5"
          style={{
            viewTransitionName: `blog-${getBlog?.id}`,
          }}
        />
      </figure>
      <div className=" space-y-5 p-5">
        <p className=" text-center text-xs">
          Published
          {new Date(getBlog?.createdAt as string).toLocaleString()} By{" "}
          <Link to={`/profile?userId=${getBlog?.userId}`}>
            <span className=" text-primary font-bold">
              {getBlog?.user.name}
            </span>
          </Link>
        </p>
        <h1 className=" text-3xl font-bold text-secondary">{getBlog?.title}</h1>

        <p>{getBlog?.description}</p>

        <div
          className=" text-base"
          dangerouslySetInnerHTML={{
            __html: getBlog?.content as string,
          }}
        />
        <Comment getBlog={getBlog} />
      </div>
    </div>
  );
};

export default BlogDetail;
