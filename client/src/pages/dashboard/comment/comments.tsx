import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthSlice } from "../../../store/client/authslice";
import { SelectedBlog } from "../../../store/server/blog-post/interface";
import { IAuthUser } from "../../../store/server/interface";
import { useCreateComment } from "../../../store/server/comment/mutation";
import { useGetComment } from "../../../store/server/comment/queries";
import { SelectedComment } from "../../../store/server/comment/interface";
import NewComment from "./components/newComment";
import ShowComments from "./components/showComments";
import Loader from "../../../components/loader";

interface IBlogCommentProps {
  getBlog?: SelectedBlog;
}

const Comment: FC<IBlogCommentProps> = ({ getBlog }) => {
  const navigate = useNavigate();
  const createComment = useCreateComment();
  const location = useLocation();
  const { auth } = useAuthSlice();
  const { data: getComments, isLoading } = useGetComment({
    id: String(getBlog?.id),
    limit: 8,
  });
  const [replycmt, setReplyCmt] = useState<SelectedComment[]>([]);
  const handleComment = (body: string) => {
    if (!auth?.access_token || !auth.user) return;

    const data = {
      user: auth.user,
      content: body,
      blog_id: String(getBlog?.id),
      blog_user_id: String((getBlog?.user as IAuthUser)?._id),
      createdAt: new Date().toISOString(),
    };
    createComment.mutate(data);
  };

  useEffect(() => {
    console.log(replycmt);
  }, [replycmt]);
  return (
    <>
      <h1 className=" text-2xl text-secondary-content">⭐ Comment ⭐</h1>

      {auth?.user ? (
        <NewComment handleComment={handleComment} />
      ) : (
        <div className=" card card-side bg-base-200 shadow-xl my-2">
          <div className="card-body">
            <h2 className="card-title">You can recommend about This Blog</h2>
            <p>Please go to Login here</p>
            <div className="card-actions justify-start">
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate("/login", {
                    state: location.pathname,
                  })
                }
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : Number(getComments?.length) >= 1 ? (
        getComments?.map((comment) => (
          <div key={comment.id}>
            <ShowComments
              key={comment.id}
              comment={comment}
              replycmt={replycmt}
              setReplycmt={setReplyCmt}
            >
              {replycmt.map((reply, idx) => (
                <ShowComments
                  key={idx}
                  comment={reply}
                  replycmt={replycmt}
                  setReplycmt={setReplyCmt}
                />
              ))}
            </ShowComments>
            {getComments.length > 1 && (
              <div className=" divider divide-red-500" />
            )}
          </div>
        ))
      ) : (
        <div className=" w-full">
          <img
            src="/5358810-removebg-preview.png"
            className=" mx-auto w-1/2 "
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Comment;
